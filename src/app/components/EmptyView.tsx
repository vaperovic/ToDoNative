import React from 'react';
import { Component } from 'react';
import { Text, View } from 'react-native';

export interface EmptyViewProps {
  text: string;
}

export class EmptyView extends Component<EmptyViewProps> {
  public render() {
      return <View>
            <Text>{this.props.text}</Text>
        </View>;
    }
}
