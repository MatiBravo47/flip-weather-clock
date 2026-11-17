import { StyleSheet, Text, View } from "react-native";
import { WeatherCondition } from "../services/weatherService";

interface WeatherWidgetProps {
  temperature: number | null;
  condition: WeatherCondition | null;
  description: string;
  loading?: boolean;
}

const weatherIcons: Record<WeatherCondition, string> = {
  sunny: "☀",
  "partly-cloudy": "☼",
  cloudy: "☁",
  foggy: "≋",
  rainy: "☂",
  snowy: "❄",
  stormy: "⚡",
};

export function WeatherWidget({
  temperature,
  condition,
  description,
  loading = false,
}: WeatherWidgetProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>
        {condition ? weatherIcons[condition] : "☁"}
      </Text>

      <View style={styles.info}>
        <Text style={styles.temperature}>
          {loading ? "--°" : temperature !== null ? `${temperature}°` : "--°"}
        </Text>

        <Text style={styles.description}>
          {loading ? "Cargando..." : description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  icon: {
    color: "#FFFFFF",
    fontSize: 30,
  },

  info: {
    alignItems: "flex-start",
  },

  temperature: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "400",
    fontVariant: ["tabular-nums"],
  },

  description: {
    color: "#888888",
    fontSize: 10,
    marginTop: 2,
  },
});
