import { StyleSheet, Text, View } from "react-native";
import { FlipDigit } from "./FlipDigit";

interface FlipClockProps {
  hours: string;
  minutes: string;
}

export function FlipClock({ hours, minutes }: FlipClockProps) {
  return (
    <View style={styles.container}>
      {/* Horas */}
      <View style={styles.digits}>
        {Array.from(hours).map((digit, index) => (
          <FlipDigit key={`hour-${index}`} value={digit} />
        ))}
      </View>

      {/* Separador */}
      <Text style={styles.separator}>:</Text>

      {/* Minutos */}
      <View style={styles.digits}>
        {Array.from(minutes).map((digit, index) => (
          <FlipDigit key={`minute-${index}`} value={digit} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  digits: {
    flexDirection: "row",
    gap: 6,
  },

  separator: {
    color: "#FFFFFF",
    fontSize: 65,
    fontWeight: "300",
    marginHorizontal: 2,
    marginBottom: 8,
  },
});
