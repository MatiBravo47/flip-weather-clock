import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";

import { useClock } from "../hooks/useClock";
import { FlipClock } from "./FlipClock";

import { WeatherWidget } from "../../weather/components/WeatherWidget";
import { useWeather } from "../../weather/hooks/useWeather";

export function ClockPreview() {
  const { hours, minutes, date } = useClock();
  const { weather, loading, error } = useWeather();

  const [keepAwake, setKeepAwake] = useState(true);

  // Ocultar la barra de navegación de Android
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

  // Controlar si la pantalla permanece encendida
  useEffect(() => {
    const tag = "flip-weather-clock";

    async function updateKeepAwake() {
      try {
        if (keepAwake) {
          await activateKeepAwakeAsync(tag);
        } else {
          deactivateKeepAwake(tag);
        }
      } catch (error) {
        console.warn("Error al configurar la pantalla:", error);
      }
    }

    updateKeepAwake();

    return () => {
      deactivateKeepAwake(tag);
    };
  }, [keepAwake]);

  return (
    <>
      <StatusBar hidden />

      <View style={styles.container}>
        {/* Clima: esquina superior izquierda */}
        <View style={styles.weatherPosition}>
          <WeatherWidget
            temperature={weather?.temperature ?? null}
            condition={weather?.condition ?? null}
            description={
              error
                ? "Sin conexión"
                : (weather?.description ?? "Consultando...")
            }
            loading={loading}
          />
        </View>

        {/* Reloj principal */}
        <View style={styles.clockContainer}>
          <FlipClock hours={hours} minutes={minutes} />

          <Text style={styles.date}>{date.toUpperCase()}</Text>
        </View>

        {/* Indicador de pantalla encendida */}
        <Pressable
          style={styles.keepAwakeButton}
          onPress={() => setKeepAwake((previous) => !previous)}
          hitSlop={12}
        >
          <View
            style={[
              styles.statusIndicator,
              keepAwake && styles.statusIndicatorActive,
            ]}
          />

          <Text style={styles.buttonText}>
            {keepAwake ? "Pantalla activa" : "Pantalla inactiva"}
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  clockContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  date: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "500",
    letterSpacing: 3,
    marginTop: 24,
  },

  weatherPosition: {
    position: "absolute",
    top: 20,
    left: 24,
    zIndex: 10,
  },

  keepAwakeButton: {
    position: "absolute",
    top: 20,
    right: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    padding: 5,
    opacity: 0.55,
    zIndex: 10,
  },

  statusIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#666666",
  },

  statusIndicatorActive: {
    backgroundColor: "#4CAF50",
  },

  buttonText: {
    color: "#AAAAAA",
    fontSize: 10,
    letterSpacing: 0.5,
    fontWeight: "400",
  },
});
