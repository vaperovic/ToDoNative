import { AsyncStorage } from "react-native";
import { ToDo, ToDoInterface } from "../../models/ToDo/ToDo.model";

export interface ToDoApiInterface {
    getToDos: () => Promise<ToDoInterface[]>;
    saveToDos: (todos: ToDoInterface[]) => Promise<ToDoInterface[]>;
}

interface ToDoDbObject {
    name: string;
    listId: number;
    completed: boolean;
    index: number;
}

export class ToDoApi<ToDoApiProps> implements ToDoApiInterface {
    private readonly url: string;

    constructor(url: string, path: string) {
        this.url = `${url}:${path}`;
    }

    public async getToDos(): Promise<ToDoInterface[]> {
        try {
            const todosJson = await AsyncStorage.getItem(this.url);

            if (todosJson) {
                const parsedTodos = JSON.parse(todosJson);

                return parsedTodos.map((todo: ToDoDbObject) => {
                    return new ToDo(
                        todo.name,
                        todo.listId,
                        todo.completed,
                        todo.index
                    )
                })
            }

            return [];
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    // This would normally be in 3 parts (POST, PUT and DELETE), but since I'm faking
    // api by using AsyncStorage and always saving whole list, I'll simplify it by
    // only using this function
    public async saveToDos(todos: ToDoInterface[]): Promise<ToDoInterface[]> {
        try {
            const todosAsJson = JSON.stringify(todos.map((todo: ToDoInterface) => {
                return todo.toJSON();
            }));

            await AsyncStorage.setItem(this.url, todosAsJson);

            // ideally api would return new state or some sort of response to confirm
            // action, so I just return state of todos I just saved
            return todos;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

}