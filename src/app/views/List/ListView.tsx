import React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { NavigationStackScreenOptions } from "react-navigation";
import { Input } from "../../components/Input/Input";
import { ListsList } from "./components/ListsList/ListsList";
import {RootStoreInterface} from "../../../stores/Root.store";
import GlobalStyles from '../../styles';

export interface ListViewProps {
    navigation: any;
    rootStore: RootStoreInterface;
}

interface ListViewState {}

@inject('rootStore')
@observer
export class ListView extends Component<ListViewProps, ListViewState> {

    public static navigationOptions: NavigationStackScreenOptions = {
        title: 'My Lists',
    };

    private createList = async (name: string) => {
        const {rootStore} = this.props;

        await name && rootStore.listStore.createList(name);
    };

    public render() {
        const { navigation, rootStore } = this.props;

        return (
            <View style={GlobalStyles.fullHeightScreen}>
                <ListsList lists={rootStore.listStore.lists}
                           handleDelete={rootStore.listStore.deleteList}
                           handleEdit={rootStore.listStore.editList}
                           makeEditable={rootStore.listStore.toggleListEdit}
                           openDetails={navigation.navigate}
                />
                <Input placeholder={'New list item'}
                       addLabel={'Add list'}
                       handleSave={this.createList}
                />
            </View>
        );
    }
}