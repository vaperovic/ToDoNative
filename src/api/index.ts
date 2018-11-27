import config from '../config';
import { ListApi, ListsApiInterface } from './List/List.api';
import { ToDoApi, ToDoApiInterface } from './ToDo/ToDo.api';

export interface ApiInterface {
  lists: ListsApiInterface;
  todos: ToDoApiInterface;
}

export const api = {
  lists: new ListApi(config.API.LIST.URL, config.API.LIST.PATH),
  todos: new ToDoApi(config.API.TODO.URL, config.API.TODO.PATH),
};
