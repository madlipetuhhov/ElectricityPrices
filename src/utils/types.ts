export type EleringPrices = { [country: string]: { timestamp: number, price: number }[] }
export type Price = { timestamp: number; price: number };
export type FormattedTimeAndPrice = { time: string; price: string };
