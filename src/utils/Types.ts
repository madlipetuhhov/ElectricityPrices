import langs from "../i18n/langs.json";

export const countries = {
    ee: 'Eesti',
    lv: 'Läti',
    lt: 'Leedu',
    fi: 'Soome'
}

export type Country = keyof typeof countries

export type Device = {
    watts: number
    hours: number
}

export type Devices = {
    [deviceCode: string]: Device
}

export type ISODate = `${number}-${number}-${number}`

export type DayPricesCentsPerKWh = number[]

export type TimeAndPrice = { timestamp: number; price: number }

export type EleringPrices = Record<Country, TimeAndPrice[]>

export type Lang = typeof langs[number]