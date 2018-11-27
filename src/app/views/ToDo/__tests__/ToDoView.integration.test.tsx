import React from 'react';
import {mount, configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ToDosView } from "../ToDosView";
import { RootStore } from "../../../../stores/Root.store";
import { ApiInterface } from "../../../../api";
import { FlatList } from "react-native";
import {List} from "../../../../models/List/List.model";
import {ToDo} from "../../../../models/ToDo/ToDo.model";
import {ToDosList} from "../components/ToDosList/ToDosList";

configure({adapter: new Adapter()});

const MockApi = jest.fn<ApiInterface>(() => ({
    lists: jest.fn(() => ({
        getLists: jest.fn(),
        saveLists: jest.fn((lists: List[]) => {})
    }))(),
    todos: jest.fn(() => ({
        getToDos: jest.fn(),
        saveToDos: jest.fn((todos: ToDo[]) => {})
    }))()
}));

const apiMock = new MockApi();

const navigationMock = {
    getParam: jest.fn(() => {
        return {
            index: 1
        }
    })
};

describe('ToDoView integration test', () => {

    it('should render two todos', async () => {
        const rootStore = new RootStore(apiMock);

        await rootStore.toDoStore.createToDo("prvi", 1);
        await rootStore.toDoStore.createToDo("drugi", 1);

        const wrapper = shallow(<ToDosView rootStore={rootStore} navigation={navigationMock}/>).dive();

        wrapper.find(ToDosList).first().props().handleEdit(rootStore.toDoStore.todos[0], "novi");

        expect(rootStore.toDoStore.todos[0].name).toBe("novi");
    })

});