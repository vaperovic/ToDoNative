import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';

import { ToDo } from '../../../../models/ToDo/ToDo.model';
import { ListStoreInterface } from '../../../../stores/List/List.store';
import { RootStoreInterface } from '../../../../stores/Root.store';
import { ToDoStoreInterface } from '../../../../stores/ToDo/ToDo.store';
import { Input } from '../../../components/Input/Input';
import { ToDosView } from '../ToDosView';

configure({ adapter: new Adapter() });

const ALL_TODOS = [{ index: 1, completed: false, name: 'todo', listId: 1 }];

const MockListStore = jest.fn<ListStoreInterface>(() => {});
const MockToDoStore = jest.fn<ToDoStoreInterface>(() => ({
  todos: [],
  createToDo: jest.fn((tekst: string, listId: number) => {}),
  deleteToDo: jest.fn(),
  toggleToDoEdit: jest.fn(),
  editToDos: jest.fn(),
  getToDosForList: jest.fn(() => {
      return ALL_TODOS.map(todo => (new ToDo(todo.name, todo.listId, todo.completed, todo.index)));
    }),
}));

const listStoreMock = new MockListStore();
const todosStoreMock = new MockToDoStore();

const MockRootStore = jest.fn<RootStoreInterface>(() => ({
  listStore: listStoreMock,
  toDoStore: todosStoreMock,
}));

const navigation = {
  getParam: jest.fn(() => {
      return {
          index: 1,
        };
    }),
};

const rootStoreMock = new MockRootStore();

describe('ToDoView unit test', () => {

  it('should render correctly', () => {

      const tree = renderer.create(<ToDosView rootStore={rootStoreMock} navigation={navigation}/>).toJSON();

      expect(tree).toMatchSnapshot();
    });

  it('should call createToDo when add todo clicked', () => {
      const wrapper = shallow(<ToDosView rootStore={rootStoreMock} navigation={navigation}/>).dive();

      wrapper.find(Input).first().props().handleSave('novi');

      expect(todosStoreMock.createToDo).toBeCalledTimes(1);
      expect(todosStoreMock.createToDo).toBeCalledWith('novi', 1);
      expect(navigation.getParam).toBeCalledTimes(3);
    });

});
