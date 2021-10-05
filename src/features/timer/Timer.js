import React, { useState } from "react";

import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import { ProgressBar } from "react-native-paper";
import { Timing } from "./Timing";
import { View, StyleSheet, Text, Vibration, Platform } from "react-native";
import { fontSizes } from "../../utils/sizes";
import { colors } from "../../utils/colors";
import { Countdown } from "../../components/Countdown";
import { useKeepAwake } from "expo-keep-awake";

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const DEFAULT_TIME = 30;
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const onFinish = () => {
    setMinutes(DEFAULT_TIME);
    setIsStarted(false);
    setProgress(1);
    vibrate();
    onTimerEnd();
  };

  const vibrate = () => {
    if (Platform.OS === "android") {
      Vibration.vibrate(2000);
    } else {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 2000);
    }
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    console.log("change time", min);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> Focusing On:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.countdownContainer}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onFinish={onFinish}
        />
        <View style={styles.progressBarContainer}>
          <ProgressBar
            progress={progress}
            color="#23ffa5"
            style={styles.progressBar}
          />
        </View>

        <View style={styles.button}>
          {!isStarted ? (
            <>
              <View style={styles.timingContainer}>
                <Timing onChangeTime={changeTime} />
              </View>
              <AwesomeButtonRick
                onPress={() => {
                  setIsStarted(true);
                }}
              >
                start
              </AwesomeButtonRick>
            </>
          ) : (
            <AwesomeButtonRick
              onPress={() => {
                setIsStarted(false);
              }}
            >
              stop
            </AwesomeButtonRick>
          )}
        </View>

        <View style={styles.clearButton}>
          <AwesomeButtonRick
            onPress={() => {
              clearSubject();
            }}
          >
            cancel
          </AwesomeButtonRick>
        </View>
      </View>
    </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: colors.secondary,
  },
  titleContainer: {
    marginVertical: 20,
  },
  title: {
    marginTop: fontSizes.md,
    paddingHorizontal: fontSizes.xl,
    fontSize: fontSizes.md,
    textAlign: "center",
    color: colors.primary,
  },
  task: {
    color: colors.forth,
    fontSize: fontSizes.xl,
    textAlign: "center",
    fontWeight: "bold",
  },
  countdownContainer: {
    marginTop: fontSizes.lg,
    alignItems: "center",
    justifyContent: "center",
    flex: 0.5,
  },
  button: {
    alignItems: "center",
    marginVertical: fontSizes.md,
    paddingHorizontal: fontSizes.xl,
  },
  progressBar: {
    // marginVertical: fontSizes.md,
    // marginHorizontal: fontSizes.sm,
    // width: "100%",
    width: "100%",
    height: 30,
  },
  progressBarContainer: {
    width: "100%",
    marginVertical: fontSizes.md,
    // marginHorizontal: fontSizes.sm,
  },
  timingContainer: {
    // marginHorizontal: fontSizes.sm,
  },
  clearButton: {
    marginHorizontal: fontSizes.sm,
  },
});
