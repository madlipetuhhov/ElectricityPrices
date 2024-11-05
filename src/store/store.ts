import {writable} from "svelte/store";

interface PriceData {
    timestamp: number
    price: number
}

interface CountryData {
    [countryCode: string]: PriceData[]
}

export const pricesStore = writable<{ prices: CountryData; selectedCountry: string}>({
    prices: {},
    selectedCountry: 'ee',
})