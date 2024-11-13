import langs from "../i18n/langs.json";

export const countries = {
    ee: 'Eesti',
    lv: 'Läti',
    lt: 'Leedu',
    fi: 'Soome'
}

export type Country = keyof typeof countries

export const languages = {
    en: 'Inglise keel',
    et: 'Eesti keel'
}

export type Language = keyof typeof languages

export type ISODate = `${number}-${number}-${number}`

export type TimeAndPrice = { timestamp: number; price: number }

export type EleringPrices = Record<Country, TimeAndPrice[]>

export type FormattedTimeAndPrice = { time: string; price: number }

export type Lang = typeof langs[number]