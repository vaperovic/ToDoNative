import { ToDoApiInterface } from '../../../api/ToDo/ToDo.api';
import { ToDoStore } from '../ToDo.store';

const MockApi = jest.fn<ToDoApiInterface>(() => ({
  getToDos: jest.fn(),
  saveToDos: jest.fn(),
}));
const MockRootStore = jest.fn(() => {});

const apiMock = new MockApi();
const rootStoreMock = new MockRootStore();

const afterEachCallback = () => {
  jest.resetAllMocks();
};

describe('ToDoStore', () => {

  afterEach(afterEachCallback);

  it('should create new todo', async () => {

      const store = new ToDoStore(rootStoreMock, apiMock);

      await store.createToDo('first', 1);
      await store.createToDo('second', 1);

      expect(store.todos.length).toBe(2);
      expect(apiMock.saveToDos).toBeCalledTimes(2);
    });

  it('should delete todo', async () => {

      const store = new ToDoStore(rootStoreMock, apiMock);

      await store.createToDo('first', 1);
      await store.createToDo('second', 1);

      await store.deleteToDo(store.todos[0]);

      expect(store.todos.length).toBe(1);
      expect(apiMock.saveToDos).toBeCalledTimes(3);
      expect(store.todos[0].name).toBe('second');
    });

  it('should edit todo', async () => {

      const store = new ToDoStore(rootStoreMock, apiMock);

      await store.createToDo('first', 1);
      await store.createToDo('second', 1);

      await store.editToDos(store.todos[0], 'newName');

      expect(store.todos.length).toBe(2);
      expect(apiMock.saveToDos).toBeCalledTimes(3);
      expect(store.todos[0].name).toBe('newName');
    });

  it('should toggle todos edit mode', async () => {

      const store = new ToDoStore(rootStoreMock, apiMock);

      await store.createToDo('first', 1);
      await store.createToDo('second', 1);

      const oldListEditMode = store.todos[0].isInEditMode;

      await store.toggleToDoEdit(store.todos[0]);

      expect(store.todos.length).toBe(2);
      expect(apiMock.saveToDos).toBeCalledTimes(3);
      expect(store.todos[0].isInEditMode).toBe(!oldListEditMode);
    });

  it('should toggle todos isCompleted', async () => {

      const store = new ToDoStore(rootStoreMock, apiMock);

      await store.createToDo('first', 1);
      await store.createToDo('second', 1);

      const oldToDoIsCompleted = store.todos[0].isCompleted;

      await store.toggleToDoCompleted(store.todos[0]);

      expect(store.todos.length).toBe(2);
      expect(apiMock.saveToDos).toBeCalledTimes(3);
      expect(store.todos[0].isCompleted).toBe(!oldToDoIsCompleted);
    });

});
