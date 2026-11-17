import { useCallback, useEffect, useState } from "react";
import { fetchWeather, WeatherData } from "../services/weatherService";

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const updateWeather = useCallback(async () => {
    try {
      setError(false);

      const data = await fetchWeather();
      setWeather(data);
    } catch (err) {
      console.warn("Error al consultar el clima:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    updateWeather();

    // Actualizar cada 15 minutos
    const interval = setInterval(updateWeather, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, [updateWeather]);

  return {
    weather,
    loading,
    error,
    refreshWeather: updateWeather,
  };
}
