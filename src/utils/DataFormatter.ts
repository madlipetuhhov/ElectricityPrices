import type {PriceWithTime, FormattedTimeAndPrice} from './types';


export function convertEuroMWhToCentKWh(priceInEuroMWh: number): number {
    return (priceInEuroMWh * 100) / 1000
}

export function addVatToPrice(price: number): number {
    return price * 1.22
}

export function formatTimeAndPrice(prices: PriceWithTime[]): FormattedTimeAndPrice[] {
    if (!prices || prices.length === 0) {
        return [];
    }

    return prices.map(({timestamp, price}) => {
        const date = new Date(timestamp * 1000)
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const time = `${hours}:${minutes}`

        const convertedPrice = convertEuroMWhToCentKWh(price)
        const convertedPriceWithVat = addVatToPrice(convertedPrice)

        return {time, price: convertedPriceWithVat.toFixed(2)}
    })
}