import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Typography from './Typography'

const QuickTips = () => {
  return (
    <View style={styles.container}>
      <Typography weight={600}>Quick Tips</Typography>
      <Typography marginTop={10} marginBottom={10}>You need to save more this weekend...</Typography>
    </View>
  );
}

export default QuickTips

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
        borderColor: "#DCDCDC",
        borderRadius: 10,
        marginTop: 10,
        width: "90%",
        alignSelf: "center",
        paddingVertical: 10,
    paddingHorizontal: 10
  },
});