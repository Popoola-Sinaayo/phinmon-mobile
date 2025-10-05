import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typography from '@/components/Typography';

const Settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Typography weight={600} size={24}>
          Settings
        </Typography>
      </View>
    </SafeAreaView>
  );
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    position: "relative",
  },
  topContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    // paddingVertical: 20,
    // backgroundColor: "red",
  },
});