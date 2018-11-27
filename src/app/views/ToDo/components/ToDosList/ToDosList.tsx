import React from 'react';
import { Component } from 'react';
import {CheckBox} from "react-native-elements";
import { ToDoInterface } from "../../../../../models/ToDo/ToDo.model";
import { CustomList } from "../../../../components/CustomList/CustomList";
import {ToDosListStyle} from "./ToDosList.style";

export interface ToDosListProps {
    todos: ToDoInterface[];
    handleDelete: (toDo: ToDoInterface) => void;
    handleEdit: (toDo: ToDoInterface, task: string) => void;
    makeEditable: (toDo: ToDoInterface) => void;
    toggleTaskFinish: (toDo: ToDoInterface) => void;
}

type RenderItemElement = {
    item: ToDoInterface
}

export class ToDosList extends Component<ToDosListProps> {

    private toggleFinish = (item: ToDoInterface) => {
        const {toggleTaskFinish} = this.props;

        return () => {
            toggleTaskFinish(item);
        }
    };

    private getTextStyleBasedOnCompletionStatus = (item: ToDoInterface) => {
        return {
            textDecorationLine: item.isCompleted ? 'line-through' : 'none'
        }
    };

    private renderFinishButton = (item: ToDoInterface) => {
        return (
            <CheckBox
                checked={item.isCompleted}
                title={item.isCompleted ? 'Start' : 'Finish'}
                onPress={this.toggleFinish(item)}
                containerStyle={ToDosListStyle.checkBoxStyle}
            />
        );
    };

    public render() {
        const { todos, makeEditable, handleEdit, handleDelete } = this.props;

        return (
            <CustomList items={todos}
                        renderAdditionalActions={this.renderFinishButton}
                        makeEditable={makeEditable}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        emptyListText="No todos yet"
                        getTextStyle={this.getTextStyleBasedOnCompletionStatus}
            />
        );
    }
}