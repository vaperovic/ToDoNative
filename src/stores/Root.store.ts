import { ListStore, ListStoreInterface } from "./List/List.store";
import { ToDoStore, ToDoStoreInterface } from "./ToDo/ToDo.store";
import { ApiInterface } from "../api";

export interface RootStoreInterface {
    listStore: ListStoreInterface,
    toDoStore: ToDoStoreInterface
}

export class RootStore implements RootStoreInterface {
    private api: ApiInterface;
    public listStore: ListStoreInterface;
    public toDoStore: ToDoStoreInterface;

    constructor(api: ApiInterface) {
        this.api = api;
        this.listStore = new ListStore(this, api.lists);
        this.toDoStore = new ToDoStore(this, api.todos);
    }
}