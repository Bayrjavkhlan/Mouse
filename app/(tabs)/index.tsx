import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Accelerometer } from "expo-sensors";

export default function App() {
  const [accelerometerData, setAccelerometerData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [movement, setMovement] = useState("None");

  useEffect(() => {
    const subscription = Accelerometer.addListener((accelerometerData) => {
      setAccelerometerData(accelerometerData);
    });

    // Start accelerometer updates
    Accelerometer.setUpdateInterval(100); // Update every 100ms

    // Clean up the listener when the component is unmounted
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    // Determine movement direction based on accelerometer data
    const { x, y, z } = accelerometerData;

    if (x > 0.2) {
      setMovement("Moving Right");
    } else if (x < -0.2) {
      setMovement("Moving Left");
    } else if (y > 0.2) {
      setMovement("Moving Up");
    } else if (y < -0.2) {
      setMovement("Moving Down");
    } else {
      setMovement("None");
    }
  }, [accelerometerData]);

  return (
    <View style={styles.container}>
      <Text>Movement Direction: {movement}</Text>
      <Text>Accelerometer Data:</Text>
      <Text>X: {accelerometerData.x}</Text>
      <Text>Y: {accelerometerData.y}</Text>
      <Text>Z: {accelerometerData.z}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
