import {observable} from "mobx";

export interface ToDoInterface {
    name: string;
    isCompleted: boolean;
    index: number;
    listId: number;
    isInEditMode: boolean;
    toggleEditMode: () => void;
    toJSON: () => ToDoJSON;
}

export interface ToDoJSON {
    name: string;
    completed: boolean;
    index: number;
    listId: number;
}

export class ToDo implements ToDoInterface {
    @observable private _name: string;
    @observable private _completed: boolean;
    @observable private _inEditMode: boolean;
    private  readonly _listId: number;
    private readonly _index: number;

    private static getRandomIndex() {
        return Math.floor((Math.random() * 10000) + 1);
    }

    constructor(name: string, listId: number, completed: boolean = false, index: number = ToDo.getRandomIndex(), inEditMode: boolean = false) {
        this._name = name;
        this._listId = listId;
        this._completed = completed;
        this._inEditMode = inEditMode;
        this._index = index
    }

    public toJSON(): ToDoJSON {
        return {
            index: this._index,
            completed: this._completed,
            name: this._name,
            listId: this._listId
        }
    }

    public set name(name: string) {
        this._name = name;
    }

    public set isCompleted(completed: boolean) {
        this._completed = completed;
    }

    public toggleEditMode(): void {
        this._inEditMode = !this._inEditMode;
    }


    public get index(): number {
        return this._index;
    }

    public get name(): string {
        return this._name;
    }

    public get isInEditMode(): boolean {
        return this._inEditMode;
    }

    public get listId(): number {
        return this._listId;
    }

    public get isCompleted(): boolean {
        return this._completed;
    }

}