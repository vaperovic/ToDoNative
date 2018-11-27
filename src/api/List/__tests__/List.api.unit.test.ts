import { AsyncStorage } from 'react-native';
import { List } from '../../../models/List/List.model';
import { ListApi } from '../List.api';

const ALL_LISTS = [
    { index: 1, name: 'lists' },
];

jest.mock('react-native', () => ({
  AsyncStorage: {
      setItem: jest.fn((storeKey: string, valueToSave: string) => {
          return async () => {
              return;
            };
        }),
      getItem: jest.fn(async (storeKey: string) => {
          return JSON.stringify(ALL_LISTS);
        }),
    },
}));

const afterEachCallback = () => {
  jest.resetAllMocks();
};

describe('ListApi', () => {

  afterEach(afterEachCallback);

  it('should return all lists from storage', async () => {

      const api = new ListApi('fakeurl', 'fakepath');

      const lists = await api.getLists();

      expect(lists.length).toBe(1);
      expect(AsyncStorage.getItem).toBeCalledTimes(1);
      expect(AsyncStorage.getItem).toBeCalledWith('fakeurl:fakepath');
    });

  it('should return newly stored lists', async () => {

      const api = new ListApi('fakeurl', 'fakepath');

      const mappedLists = ALL_LISTS.map(
            (list) => (
                new List(
                    list.name, list.index,
                )
            ),
        );

      const lists = await api.saveLists(mappedLists);

      expect(lists.length).toBe(1);

      expect(AsyncStorage.setItem).toBeCalledTimes(1);
      expect(AsyncStorage.setItem).toBeCalledWith('fakeurl:fakepath', JSON.stringify(mappedLists));
    });

});
