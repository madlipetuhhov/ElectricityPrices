import type {Country, EleringPrices, ISODate, PriceWithTime} from "./types";

export function getFetchUrl(date: ISODate) {
    const startTime = new Date(date + 'T00:00').toISOString()
    const endTime = new Date(date + 'T23:59').toISOString()
    return `/api/nps/price?start=${startTime}&end=${endTime}`
}

export async function fetchData(date: ISODate): Promise<EleringPrices> {
    const response = await fetch(getFetchUrl(date))
    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    const responseData = await response.json()
    if (responseData.success) {
        return responseData.data as EleringPrices
    } else {
        throw new Error('API returned an unsuccessful response')
    }
}

export function getPricesForCountry(allPrices: EleringPrices, countryCode: Country): PriceWithTime[] {
    return allPrices[countryCode]
}
