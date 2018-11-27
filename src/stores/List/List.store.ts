import {action, observable} from 'mobx';
import { List, ListInterface } from '../../models/List/List.model';
import { ListsApiInterface } from "../../api/List/List.api";
import { RootStoreInterface } from "../Root.store";

export interface ListStoreInterface {
    lists: ListInterface[];
    createList: (name: string) => void;
    deleteList: (list: ListInterface) => void;
    toggleListEdit: (list: ListInterface) => void;
    editList: (list: ListInterface, name: string) => void;
}

export class ListStore implements ListStoreInterface {
    @observable private _lists: ListInterface[] = [];
    private api: ListsApiInterface;
    private rootStore: RootStoreInterface;

    constructor(rootStore: RootStoreInterface, api: ListsApiInterface) {
        this.api = api;
        this.rootStore = rootStore;
    }

    public get lists(): ListInterface[] {
        return this._lists;
    }

    public set lists (lists: ListInterface[]) {
        this._lists = lists;
    }

    @action
    public createList = async (name: string) => {
        try {
            const newList = new List(name);
            this._lists.push(newList);

            await this.api.saveLists(this._lists);
        } catch (e) {
            console.log(e);
        }
    };

    @action
    public deleteList = async (list: ListInterface) => {
        try {
            this._lists = this._lists.filter((listItem: ListInterface) => {
                return listItem.index !== list.index;
            });

            await this.rootStore.toDoStore.deleteToDosOfList(list.index);

            await this.api.saveLists(this._lists);
        } catch (e) {
            console.log(e);
        }
    };

    @action toggleListEdit = async (list: ListInterface) => {
        try {
            this._lists = this._lists.map((listItem: ListInterface) => {
                if (listItem.index === list.index) {
                    listItem.toggleEditMode();
                }

                return listItem;
            });

            await this.api.saveLists(this._lists);
        } catch (e) {
            console.log(e);
        }
    };

    @action
    public editList = async (list: ListInterface, name: string) => {
        try {
            this._lists = this._lists.map((listItem: ListInterface) => {
                if (listItem.index === list.index) {
                    listItem.name = name;
                    listItem.toggleEditMode();
                }

                return listItem;
            });

            await this.api.saveLists(this._lists);
        } catch (e) {
            console.log(e);
        }
    };
}