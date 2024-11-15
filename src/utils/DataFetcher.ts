import type {Country, DayPricesCentsPerKWh, EleringPrices, ISODate, TimeAndPrice} from "./Types";

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

export function getPricesForCountry(allPrices: EleringPrices, countryCode: Country): DayPricesCentsPerKWh {
    if (!allPrices[countryCode]) throw new Error('Country code not found')
    const dayPricesForCountry: DayPricesCentsPerKWh = []

    allPrices[countryCode].map(({price}) => {
        const priceInCentsKWh = convertEuroMWhToCentKWh(price)
        const priceWithVat = addVatToPrice(priceInCentsKWh)
        const roundedPrice = Math.round(priceWithVat * 100) / 100
        dayPricesForCountry.push(roundedPrice)
    })

    return dayPricesForCountry
}

function convertEuroMWhToCentKWh(price: number): number {
    return (price * 100) / 1000
}

function addVatToPrice(price: number): number {
    return price * 1.22
}