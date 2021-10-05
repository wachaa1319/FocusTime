import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Slider from "@react-native-community/slider";

export const Timing = ({ onChangeTime }) => {
  const [time, setTime] = React.useState(30);

  useEffect(() => {
    // console.log("time", time);
    // console.log(onChangeTime);
    onChangeTime(time);
  }, [time]);

  return (
    <View>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={5}
        maximumValue={180}
        step={5}
        value={time}
        onValueChange={(value) => setTime(value)}
        // onValueChange={(value) => setTime(Math.round((value * 360) / 10) * 5)}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      {/* <Text>{time}</Text> */}
    </View>
  );
};
