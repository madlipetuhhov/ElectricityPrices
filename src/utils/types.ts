export const countries = {
    ee: 'Eesti',
    lv: 'Läti',
    lt: 'Leedu',
    fi: 'Soome'
}

export type Country = keyof typeof countries

export type ISODate = `${number}-${number}-${number}`

export type PriceWithTime = { timestamp: number; price: number };
export type EleringPrices = Record<Country, PriceWithTime[]>

export type FormattedTimeAndPrice = { time: string; price: string };
