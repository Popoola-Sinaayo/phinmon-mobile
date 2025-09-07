import { StyleSheet, View } from 'react-native'
import React from 'react'
import Typography from './Typography'
import Ionicons from "@expo/vector-icons/Ionicons";

const CustomHeader = () => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View style={styles.nameAbbreviationContainer}>
          <Typography marginTop={0} marginBottom={0} color="#FFFFFF" size={24} weight={700}>
            JD
          </Typography>
        </View>
        <Typography color="#8C78F2" size={30}>
          Hello Sheila
        </Typography>
      </View>
      <View>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>
    </View>
  );
}

export default CustomHeader

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        width: "90%",
    alignSelf: "center",
  },
  nameAbbreviationContainer: {
    width: 50,
    height: 50,
    borderRadius: 999,
      backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
});