import { StyleSheet, View } from "react-native";
import { ClockPreview } from "../features/clock/components/ClockPreview";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ClockPreview />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
});
