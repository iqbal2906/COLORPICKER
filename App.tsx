import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const COLORS = [
  'red',
  'purple',
  'blue',
  'cyan',
  'green',
  'yellow',
  'orange',
  'black',
  'white',
];

const BACKGROUND_COLOR = 'rgba(0,0,0,0.9)';

export default function App() {
  return (
    <>
      <View style={styles.topContainer}/>
      <View style={styles.bottomContainer}/>
    </>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
});
