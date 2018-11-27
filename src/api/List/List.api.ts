import { AsyncStorage } from 'react-native';
import { List, ListInterface } from '../../models/List/List.model';

export interface ListsApiInterface {
    getLists: () => Promise<ListInterface[]>;
    saveLists: (lists: ListInterface[]) => Promise<ListInterface[]>;
}

interface ListObjectFromDb {
    name: string;
    index: number;
}

export class ListApi implements ListsApiInterface {
    private readonly url: string;

    constructor(url: string, path: string) {
        this.url = `${url}:${path}`;
    }

    public async getLists(): Promise<ListInterface[]> {
        try {
            const listsJson = await AsyncStorage.getItem(this.url);

            if (listsJson) {
                const parsedLists = JSON.parse(listsJson);

                return parsedLists.map((list: ListObjectFromDb) => {
                    return new List(
                        list.name,
                        list.index,
                    );
                });
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
    public async saveLists(lists: ListInterface[]): Promise<ListInterface[]> {
        try {
            const listsAsJson = JSON.stringify(lists.map((list: ListInterface) => {
                return list.toJSON();
            }));

            await AsyncStorage.setItem(this.url, listsAsJson);

            // ideally api would return new state or some sort of response to confirm
            // action, so I just return state of lists I just saved
            return lists;
        } catch (e) {
            console.log(e);
            return lists;
        }
    }

}
