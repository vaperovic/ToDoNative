import React from 'react';
import { Component } from 'react';
import {
    Text,
    TextInput,
    TouchableHighlight,
    View,
    ViewStyle,
} from 'react-native';
import { InputStyle } from './Input.style';

export type InputProps = {
  addLabel: string;
  handleSave: (text: string) => void;
} & Partial<DefaultProps>;

interface InputState {
  text: string;
}

type DefaultProps = Readonly<typeof defaultProps>;

const defaultProps = {
  placeholder: '' as string,
  value: '' as string,
  style: {} as ViewStyle,
};

const EMPTY_STRING = '';

export class Input extends Component<InputProps, InputState> {

  public static defaultProps = defaultProps;

  constructor(props: InputProps) {
      super(props);
      this.state = {
          text: props.value || '',
        };
    }

  public createNewItem = async () => {
      const { handleSave } = this.props;
      const { text } = this.state;

      await handleSave(text);

      this.resetInput();
    }

  public handleOnChange = (text: string) => {
      this.setState({ text });
    }

  public render() {
      const { addLabel, placeholder, style } = this.props;
      const { text } = this.state;

      return (
            <View style={[InputStyle.inputContainer, style]}>
                <TextInput
                    value={text}
                    style={InputStyle.inputTextInput}
                    onChangeText={ this.handleOnChange }
                    onSubmitEditing={this.createNewItem}
                    placeholder={placeholder}
                />
                <TouchableHighlight
                    style={InputStyle.addButton}
                    onPress={this.createNewItem}>
                    <Text>{addLabel}</Text>
                </TouchableHighlight>
            </View>
        );
    }

  private resetInput = () => {
      this.setState({ text: EMPTY_STRING });
    }
}
