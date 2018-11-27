import { ListStore } from "../List.store";
import { ListsApiInterface } from "../../../api/List/List.api";
import { ListStoreInterface } from "../List.store";
import { ToDoStoreInterface } from "../../ToDo/ToDo.store";

const MockApi = jest.fn<ListsApiInterface>(() => ({
    getLists: jest.fn(),
    saveLists: jest.fn()
}));
const MockListStore = jest.fn<ListStoreInterface>(() => ({}));
const MockToDoStore = jest.fn<ToDoStoreInterface>(() => ({
    deleteToDosOfList: jest.fn((listId: number) => {

    })
}));

const listStoreMock = MockListStore();
const toDoStoreMock = MockToDoStore();

const MockRootStore = jest.fn(() => ({
    listStore: listStoreMock,
    toDoStore: toDoStoreMock
}));

const apiMock = new MockApi();
const rootStoreMock = new MockRootStore();

const afterEachCallback = () => {
    jest.resetAllMocks();
};

describe('ListStore', () => {

    afterEach(afterEachCallback);

    it('should create new lists', async () => {

        const store = new ListStore(rootStoreMock, apiMock);

        await store.createList('first');
        await store.createList('second');

        expect(store.lists.length).toBe(2);
        expect(apiMock.saveLists).toBeCalledTimes(2);
    });

    it('should delete lists', async () => {

        const store = new ListStore(rootStoreMock, apiMock);

        await store.createList('first');

        await store.createList('second');

        const itemToBeDeleted = store.lists[0];

        await store.deleteList(itemToBeDeleted);

        expect(store.lists.length).toBe(1);
        expect(apiMock.saveLists).toBeCalledTimes(3);
        expect(store.lists[0].name).toBe('second');
        expect(toDoStoreMock.deleteToDosOfList).toBeCalledWith(itemToBeDeleted.index);
        expect(toDoStoreMock.deleteToDosOfList).toBeCalledTimes(1)
    });

    it('should edit list', async () => {

        const store = new ListStore(rootStoreMock, apiMock);

        await store.createList('first');
        await store.createList('second');

        await store.editList(store.lists[0], 'newName');

        expect(store.lists.length).toBe(2);
        expect(apiMock.saveLists).toBeCalledTimes(3);
        expect(store.lists[0].name).toBe('newName')
    });

    it('should toggle list edit mode', async () => {

        const store = new ListStore(rootStoreMock, apiMock);

        await store.createList('first');
        await store.createList('second');

        const oldListEditMode = store.lists[0].isInEditMode;

        await store.toggleListEdit(store.lists[0]);

        expect(store.lists.length).toBe(2);
        expect(apiMock.saveLists).toBeCalledTimes(3);
        expect(store.lists[0].isInEditMode).toBe(!oldListEditMode)
    });

});