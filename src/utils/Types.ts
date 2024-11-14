import langs from "../i18n/langs.json";

export const countries = {
    ee: 'Eesti',
    lv: 'Läti',
    lt: 'Leedu',
    fi: 'Soome'
}

export type Country = keyof typeof countries

export const devices = {
    CAR: "Mercedes Benz EQE (7200 watts)",
    OR: "Oura sõrmus (5 watts)",
    MP: "Iphone 16 Pro Max (30 watts)",
    DV: "Dyson V15 tolmuimeja (230 watts)",
    DA: "Dyson Airwrap (1300 watts)",
    IPL: "Lumea fotoepilaator (240 watts)",
    MX: "KitchenAid lauamikser (300 watts)"
}

export type Device = keyof typeof devices

export type ISODate = `${number}-${number}-${number}`

export type TimeAndPrice = { timestamp: number; price: number }

export type EleringPrices = Record<Country, TimeAndPrice[]>

export type FormattedTimeAndPrice = { time: string; price: number }

export type Lang = typeof langs[number]