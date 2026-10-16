export type TemperatureScale = "celsius" | "fahrenheit";

export const celsiusToFahrenheit = (temperature: number): number =>
    (temperature * 9) / 5 + 32;

export const fahrenheitToCelsius = (temperature: number): number =>
    ((temperature - 32) * 5) / 9;
