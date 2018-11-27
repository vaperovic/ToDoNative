import React from 'react';
import { Component } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { Icon } from "react-native-elements";
import { Input } from "../Input/Input";
import { CustomListStyle } from "./CustomList.style";
import { EmptyView } from "../EmptyView";

export interface CustomListProps<T> {
    items: T[];
    emptyListText: string;
    handleDelete: (item: T) => void;
    handleEdit: (item: T, text: string) => void;
    makeEditable: (item: T) => void;
    renderAdditionalActions: (item: T) => any;
    getTextStyle?: (item: T) => any;
}

interface RenderItemElement<T> {
    item: T;
}

export class CustomList<T> extends Component<CustomListProps<any>> {

    private deleteListItem = (item: any) => {
        return () => {
            const { handleDelete } = this.props;

            handleDelete(item)
        }
    };

    private handleEditButtonOnPress = (item: any) => {
        const {makeEditable} = this.props;

        return () => {
            makeEditable(item);
        }
    };

    private handleEditInputSave = (item: any) => {
        const {handleEdit} = this.props;

        return (text: string) => {
            handleEdit(item, text);
        }
    };

    private renderListItemText = (item: any) => {
        const { getTextStyle } = this.props;

        if (item.isInEditMode) {
            return (
                <Input value={item.name}
                       handleSave={this.handleEditInputSave(item)}
                       addLabel="Save"
                />
            );
        }

        return <Text style={[getTextStyle && getTextStyle(item), CustomListStyle.textStyle]}>{ item.name }</Text>
    };

    private renderEditButton = (item: any) => {
        if (!item.isInEditMode) {
            return <Icon name="edit" onPress={this.handleEditButtonOnPress(item)}/>;
        }
    };

    private renderListRow = ({item}: RenderItemElement<any>) => {
        const { renderAdditionalActions } = this.props;

        return (
            <View style={CustomListStyle.cardStyle}>
                {this.renderListItemText(item)}
                <View style={CustomListStyle.actionsContainerStyle}>
                    {this.renderEditButton(item)}
                    <Icon name="delete" onPress={this.deleteListItem(item)}/>
                    {renderAdditionalActions(item)}
                </View>
            </View>
        )
    };

    private extractIndex = (item: any) => {
        return `${item.index}`;
    };

    public render() {
        const { items, emptyListText } = this.props;

        return (
            <ScrollView>
                {
                    items.length ?
                        <FlatList data={items}
                                  keyExtractor={this.extractIndex}
                                  renderItem={this.renderListRow}/> :
                        <EmptyView text={emptyListText}/>
                }
            </ScrollView>
        );
    }
}