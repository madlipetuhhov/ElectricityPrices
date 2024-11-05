import {writable} from "svelte/store";

interface PriceData {
    timestamp: number
    price: number
}

export interface CountryPrices {
    [countryCode: string]: PriceData[]
}

export const pricesStore = writable<{ prices: CountryPrices; selectedCountry: string}>({
    prices: {},
    selectedCountry: 'ee',
})