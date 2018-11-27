/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { Provider } from 'mobx-react';
import React from 'react';
import { Component } from 'react';

import { StyleSheet } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { api } from '../api';
import { RootStore } from '../stores/Root.store';
import { ListView } from './views/List/ListView';
import { ToDosView } from './views/ToDo/ToDosView';

interface AppProps {}

const AppNavigator = createStackNavigator(
  {
    Lists: ListView,
    ToDos: ToDosView,
  },
  {
    initialRouteName: 'Lists',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component<AppProps> {
  public rootStore = new RootStore(api);

  public async componentDidMount() {
      const lists = await api.lists.getLists();
      const todos = await api.todos.getToDos();

      this.rootStore.listStore.lists = lists;
      this.rootStore.toDoStore.todos = todos;
    }

  public render() {
      return (
            <Provider rootStore={this.rootStore}>
                <AppContainer/>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
