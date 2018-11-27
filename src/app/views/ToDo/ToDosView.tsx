import React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';

import { Input } from "../../components/Input/Input";
import { ToDosList } from "./components/ToDosList/ToDosList";
import { RootStoreInterface } from "../../../stores/Root.store";

import GlobalStyles from '../../styles';

export interface ToDosViewProps {
    rootStore: RootStoreInterface;
    navigation: any;
}

@inject('rootStore')
@observer
export class ToDosView extends Component<ToDosViewProps> {

    public static navigationOptions = ({ navigation }: any) => {
        return {
            title: navigation.getParam('parentList', undefined).name
        }
    };

    private addToDo = async (task: string) => {
        const { navigation, rootStore } = this.props;
        const parentList = navigation.getParam('parentList', undefined);

        task && await rootStore.toDoStore.createToDo(task, parentList.index);
    };

    public render() {
        const { navigation, rootStore } = this.props;
        const parentList = navigation.getParam('parentList', undefined);

        const todos = rootStore.toDoStore.getToDosForList(parentList.index);

        return (
            <View style={GlobalStyles.fullHeightScreen}>
                <ToDosList todos={todos}
                           handleDelete={rootStore.toDoStore.deleteToDo}
                           handleEdit={rootStore.toDoStore.editToDos}
                           makeEditable={rootStore.toDoStore.toggleToDoEdit}
                           toggleTaskFinish={rootStore.toDoStore.toggleToDoCompleted}
                />
                <Input placeholder={'New todo task'}
                       addLabel={'Add todo'}
                       handleSave={this.addToDo}
                />
            </View>
        );
    }
}