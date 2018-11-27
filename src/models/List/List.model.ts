import {observable} from "mobx";

export interface ListInterface {
    name: string;
    index: number;
    isInEditMode: boolean;
    toggleEditMode: () => void;
    toJSON: () => ListJSON;
}

export interface ListJSON {
    name: string;
    index: number;
}

export class List implements ListInterface {
    @observable private _name: string;
    @observable private _inEditMode: boolean;
    private readonly _index: number;

    private static getRandomIndex() {
        return Math.floor((Math.random() * 10000) + 1);
    }

    constructor(name: string, index: number = List.getRandomIndex(), inEditMode: boolean = false) {
        this._name = name;
        this._inEditMode = inEditMode;
        this._index = index;
    }

    public set name(name: string) {
        this._name = name;
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
        return this._inEditMode
    }

    public toJSON(): ListJSON {
        return {
            name: this.name,
            index: this.index
        }
    }

}