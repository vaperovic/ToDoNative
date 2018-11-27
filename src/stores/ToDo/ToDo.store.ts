import { action, computed, observable } from "mobx";
import { ToDo, ToDoInterface } from '../../models/ToDo/ToDo.model';
import { ToDoApiInterface } from "../../api/ToDo/ToDo.api";

export interface ToDoStoreInterface {
    todos: ToDoInterface[];
    createToDo: (name: string, listId: number) => Promise<void>;
    deleteToDo: (toDo: ToDoInterface) => Promise<void>;
    getToDosForList: (listId: number) => ToDoInterface[];
    toggleToDoEdit: (toDo: ToDoInterface) => Promise<void>;
    editToDos: (toDo: ToDoInterface, name: string) => Promise<void>;
    toggleToDoCompleted: (toDo: ToDoInterface) => Promise<void>;
    deleteToDosOfList: (listId: number) => Promise<void>;
}

export class ToDoStore implements ToDoStoreInterface {
    @observable private _todos: ToDoInterface[] = [];
    private api: ToDoApiInterface;
    private rootStore: any;

    constructor(rootStore: any, api: ToDoApiInterface) {
        this.api = api;
        this.rootStore = rootStore;
    }

    public set todos(todos: ToDoInterface[]) {
        this._todos = todos;
    }

    public get todos() {
        return this._todos;
    }

    public getToDosForList (listId: number): ToDoInterface[] {
        return this._todos.filter((todo: ToDoInterface) => (
            listId === todo.listId
        ))
    }

    @action
    public deleteToDosOfList = async (listId: number): Promise<void> => {
        try {
            this._todos = this.todos.filter((todo: ToDoInterface) => (
                listId !== todo.listId
            ));

            await this.api.saveToDos(this._todos);

            return;
        } catch (e) {
            console.log(e);
            return;
        }
    };

    @action
    public createToDo = async (name: string, listId: number): Promise<void> => {
        try {
            const newToDo = new ToDo(name, listId);
            this._todos.push(newToDo);

            await this.api.saveToDos(this._todos);

            return;
        } catch (e) {
            console.log(e);
            return;
        }
    };

    @action
    public deleteToDo = async (toDo: ToDoInterface): Promise<void> => {
        try {
            this._todos = this._todos.filter((todo: ToDoInterface) => {
                return todo.index !== toDo.index;
            });

            await this.api.saveToDos(this._todos);
            return;
        } catch (e) {
            console.log(e);
            return;
        }
    };

    @action toggleToDoEdit = async (toDo: ToDoInterface): Promise<void> => {
        try {
            this._todos = this._todos.map((todo: ToDoInterface) => {
                if (todo.index === toDo.index) {
                    todo.toggleEditMode();
                }

                return todo;
            });

            await this.api.saveToDos(this._todos);
            return;
        } catch (e) {
            console.log(e);
            return;
        }
    };

    @action
    public editToDos = async (toDo: ToDoInterface, name: string): Promise<void> => {
        try {
            this._todos = this._todos.map((todo: ToDoInterface) => {
                if (todo.index === toDo.index) {
                    todo.name = name;
                    todo.toggleEditMode();
                }

                return todo;
            });

            await this.api.saveToDos(this._todos);

            return;
        } catch (e) {
            console.log(e);
            return;
        }
    };

    @action
    toggleToDoCompleted = async (toDo: ToDoInterface): Promise<void> => {
        try {
            this._todos = this._todos.map((todo: ToDoInterface) => {
                if (todo.index === toDo.index) {
                    todo.isCompleted = !toDo.isCompleted;
                }

                return todo;
            });

            await this.api.saveToDos(this._todos);
            return;
        } catch (e) {
            console.log(e);
            return;
        }
    }

}