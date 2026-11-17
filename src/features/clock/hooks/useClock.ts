import { useEffect, useState } from "react";

export interface ClockData {
  hours: string;
  minutes: string;
  seconds: string;
  date: string;
}

function getClockData(): ClockData {
  const now = new Date();
  return {
    hours: String(now.getHours()).padStart(2, "0"),
    minutes: String(now.getMinutes()).padStart(2, "0"),
    seconds: String(now.getSeconds()).padStart(2, "0"),
    date: new Intl.DateTimeFormat("es-AR", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(now),
  };
}
export function useClock() {
  const [clock, setClock] = useState<ClockData>(() => getClockData());

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(getClockData());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return clock;
}
