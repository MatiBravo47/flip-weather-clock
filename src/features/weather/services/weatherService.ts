export type WeatherCondition =
  | "sunny"
  | "partly-cloudy"
  | "cloudy"
  | "foggy"
  | "rainy"
  | "snowy"
  | "stormy";

export interface WeatherData {
  temperature: number;
  condition: WeatherCondition;
  description: string;
}

interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
  };
}

function getWeatherCondition(code: number): {
  condition: WeatherCondition;
  description: string;
} {
  if (code === 0) {
    return { condition: "sunny", description: "Despejado" };
  }

  if (code === 1) {
    return { condition: "partly-cloudy", description: "Mayormente despejado" };
  }

  if (code === 2) {
    return { condition: "partly-cloudy", description: "Parcialmente nublado" };
  }

  if (code === 3) {
    return { condition: "cloudy", description: "Nublado" };
  }

  if (code === 45 || code === 48) {
    return { condition: "foggy", description: "Neblina" };
  }

  if (code >= 51 && code <= 67) {
    return { condition: "rainy", description: "Lluvia" };
  }

  if (code >= 71 && code <= 77) {
    return { condition: "snowy", description: "Nieve" };
  }

  if (code >= 80 && code <= 82) {
    return { condition: "rainy", description: "Chaparrones" };
  }

  if (code === 85 || code === 86) {
    return { condition: "snowy", description: "Nevadas" };
  }

  if (code >= 95) {
    return { condition: "stormy", description: "Tormenta" };
  }

  return { condition: "cloudy", description: "Variable" };
}

export async function fetchWeather(): Promise<WeatherData> {
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=-38.0055" +
    "&longitude=-57.5426" +
    "&current=temperature_2m,weather_code" +
    "&timezone=America%2FArgentina%2FBuenos_Aires";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("No se pudo obtener el clima");
  }

  const data: OpenMeteoResponse = await response.json();

  const weather = getWeatherCondition(data.current.weather_code);

  return {
    temperature: Math.round(data.current.temperature_2m),
    condition: weather.condition,
    description: weather.description,
  };
}
