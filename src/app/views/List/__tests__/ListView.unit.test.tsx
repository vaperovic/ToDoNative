import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ListView } from "../ListView";
import { ListStoreInterface } from "../../../../stores/List/List.store";
import { ToDoStoreInterface } from "../../../../stores/ToDo/ToDo.store";
import { RootStoreInterface } from "../../../../stores/Root.store";
import { List } from "../../../../models/List/List.model";
import { Input } from "../../../components/Input/Input";

configure({adapter: new Adapter()});

const ALL_LISTS = [{index: 1, name: 'test_list'}];

const MockListStore = jest.fn<ListStoreInterface>(() => {
    return {
        lists: ALL_LISTS.map(list => (new List(list.name, list.index))),
        createList: jest.fn((tekst: string) => {}),
        getListToDos: jest.fn(),
        deleteList: jest.fn(),
        toggleListEdit: jest.fn(),
        editList: jest.fn()
    }
});
const MockToDoStore = jest.fn<ToDoStoreInterface>(() => {});

const listStoreMock = new MockListStore();
const todosStoreMock = new MockToDoStore();

const MockRootStore = jest.fn<RootStoreInterface>(() => ({
    listStore: listStoreMock,
    toDoStore: todosStoreMock
}));

const navigation = {
    navigate: jest.fn()
};

const rootStoreMock = new MockRootStore();

describe('ToDoView', () => {

    it('should render correctly', () => {

        const tree = renderer.create(<ListView rootStore={rootStoreMock} navigation={navigation}/>).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should call createToDo when add todo clicked', async () => {
        const wrapper = shallow(<ListView rootStore={rootStoreMock} navigation={navigation}/>).dive();

        await wrapper.find(Input).first().props().handleSave("novi");

        expect(listStoreMock.createList).toBeCalledTimes(1);
        expect(listStoreMock.createList).toBeCalledWith("novi");
    })

});