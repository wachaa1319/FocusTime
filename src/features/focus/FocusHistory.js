import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { fontSizes } from "../../utils/sizes";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import { FlatList, SafeAreaView } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { colors } from "../../utils/colors";
import { clear } from "react-native/Libraries/LogBox/Data/LogBoxData";

const HistoryItem = ({ item, index }) => {
  console.log(item);
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.historyItem(item.status)}>{item.subject}</Text>
    </View>
  );
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  // console.log(onClear);
  const clearHistory = () => {
    onClear();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <AwesomeButtonRick
            // style={styles.clearButton}
            textColor="red"
            onPress={() => {
              clearHistory();
            }}
          >
            clear
          </AwesomeButtonRick>
          <Text style={styles.title}>Focus History</Text>
        </View>
        {!!focusHistory.length && (
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1, alignItems: "center" }}
            data={focusHistory}
            renderItem={HistoryItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: colors.forth,
  },
  historyItem: (status) => ({
    color: status === 1 ? "green" : "red",
    padding: 10,
    fontSize: fontSizes.md,
  }),
  itemContainer: {
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    width: 300,
    backgroundColor: "white",
    height: 50,
  },
  title: {
    fontSize: fontSizes.lg,
    alignSelf: "center",
    margin: 10,
  },
});
