import { StyleSheet } from 'react-native';

export const InputStyle = StyleSheet.create({
  inputContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#eee',
    },
  addButton: {
      flex: 2,
      borderLeftColor: '#eee',
      borderLeftWidth: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 10,
      height: '70%',
    },
  inputTextInput: {
      flex: 8,
    },
});
