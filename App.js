import * as React from "react";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Focus } from "./src/features/focus/focus";
import { Timer } from "./src/features/timer/Timer";
import { colors } from "./src/utils/colors";
import { sizes } from "./src/utils/sizes";
import { FocusHistory } from "./src/features/focus/FocusHistory";

// You can import from local files

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
  IN_PROGRESS: 3,
};

export default function App() {
  const [subject, setSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  // useEffect(() => {
  //   if (subject) {
  //     setFocusHistory([...focusHistory, subject]);
  //   }
  // }, [subject]);

  console.log(focusHistory);
  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
      console.log(JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addFocusHistory = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { key: String(FocusHistory.length + 1), subject, status },
    ]);
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {subject ? (
        <Timer
          focusSubject={subject}
          onTimerEnd={() => {
            addFocusHistory(subject, STATUSES.COMPLETE);
            setSubject(null);
          }}
          clearSubject={() => {
            addFocusHistory(subject, STATUSES.CANCELLED);
            setSubject(null);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={() => onClear()} />
        </>
      )}
      {/* <Text style={styles.history}>
        {focusHistory.map((subject, index) => (
          <Text key={index} style={styles.historyItem}>
            {subject}
          </Text>
        ))}
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "ios" ? sizes.xxl : sizes.sm,
    // backgroundColor: colors.forth,
  },
});
