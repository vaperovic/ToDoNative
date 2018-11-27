import { AsyncStorage } from 'react-native';
import { ToDo } from '../../../models/ToDo/ToDo.model';
import { ToDoApi } from '../ToDo.api';

const ALL_TODOS = [
    { index: 1, completed: false, name: 'todo', listId: 1 },
];

jest.mock('react-native', () => ({
  AsyncStorage: {
      setItem: jest.fn((storeKey: string, valueToSave: string) => {
          return async () => {
              return;
            };
        }),
      getItem: jest.fn(async (storeKey: string) => {
          return JSON.stringify(ALL_TODOS);
        }),
    },
}));

const afterEachCallback = () => {
  jest.resetAllMocks();
};

describe('ToDoApi', () => {

  afterEach(afterEachCallback);

  it('should return all todos from storage', async () => {

      const api = new ToDoApi('fakeurl', 'fakepath');

      const todos = await api.getToDos();

      expect(todos.length).toBe(1);
      expect(AsyncStorage.getItem).toBeCalledTimes(1);
      expect(AsyncStorage.getItem).toBeCalledWith('fakeurl:fakepath');
    });

  it('should return newly stored todos', async () => {

      const api = new ToDoApi('fakeurl', 'fakepath');

      const mappedTodos = ALL_TODOS.map(
            (todo) => (
                new ToDo(
                    todo.name, todo.listId, todo.completed, todo.index,
                )
            ),
        );

      const todos = await api.saveToDos(mappedTodos);

      expect(todos.length).toBe(1);

      expect(AsyncStorage.setItem).toBeCalledTimes(1);
      expect(AsyncStorage.setItem).toBeCalledWith('fakeurl:fakepath', JSON.stringify(mappedTodos));
    });

});
