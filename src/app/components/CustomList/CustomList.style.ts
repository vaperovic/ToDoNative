import { StyleSheet } from 'react-native';

export const CustomListStyle = StyleSheet.create({
  cardStyle: {
      paddingBottom: 10,
      paddingTop: 10,
      paddingRight: 10,
      paddingLeft: 10,
      borderBottomColor: '#eee',
      borderBottomWidth: 1,
      display: 'flex',
      flexDirection: 'column',
    },
  actionsContainerStyle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
  textStyle: {
      color: '#a7a7a7',
      fontSize: 18,
    },
});
