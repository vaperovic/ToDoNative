import React from 'react';
import { Component } from 'react';
import { Icon } from "react-native-elements";
import { ListInterface } from "../../../../../models/List/List.model";
import { CustomList } from "../../../../components/CustomList/CustomList";

export interface ListsListProps {
    lists: ListInterface[];
    handleDelete: (list: ListInterface) => void;
    handleEdit: (list: ListInterface, text: string) => void;
    makeEditable: (list: ListInterface) => void;
    openDetails: any;
}

interface RenderItemElement {
    item: ListInterface;
}

export class ListsList extends Component<ListsListProps> {

    private goToDetails = (parentList: ListInterface) => {
        const {openDetails} = this.props;

        return () => {
            openDetails("ToDos", {parentList});
        };
    };

    private renderDetailsButton = (item: ListInterface) => {
        return <Icon name="chevron-right" onPress={this.goToDetails(item)}/>;
    };

    public render() {
        const { handleEdit, handleDelete, makeEditable, lists } = this.props;

        return (
            <CustomList items={lists}
                        renderAdditionalActions={this.renderDetailsButton}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        emptyListText="No lists yet"
                        makeEditable={makeEditable}
            />
        );
    }
}