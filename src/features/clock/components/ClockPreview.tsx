import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useClock } from "../hooks/useClock";
import { FlipClock } from "./FlipClock";

export function ClockPreview() {
  const { hours, minutes, date } = useClock();

  useEffect(() => {
    async function hideNavigationBar() {
      try {
        await NavigationBar.setVisibilityAsync("hidden");
      } catch (error) {
        console.warn("No se pudo ocultar la barra:", error);
      }
    }

    hideNavigationBar();

    return () => {
      NavigationBar.setVisibilityAsync("visible");
    };
  }, []);

  return (
    <>
      <StatusBar hidden />

      <View style={styles.container}>
        <FlipClock hours={hours} minutes={minutes} />

        <Text style={styles.date}>{date.toUpperCase()}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },

  seconds: {
    color: "#AAAAAA",
    fontSize: 32,
    fontWeight: "400",
    marginTop: 18,
    fontVariant: ["tabular-nums"],
  },

  date: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "500",
    letterSpacing: 3,
    marginTop: 20,
  },
});
