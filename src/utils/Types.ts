import langs from "../i18n/langs.json";

export const countries = {
    ee: 'Eesti',
    lv: 'Läti',
    lt: 'Leedu',
    fi: 'Soome'
}

export type Country = keyof typeof countries

export const devices = {
    CAR: { name: "Mercedes Benz EQE", powerInWatts: 7200 },
    OR: { name: "Oura sõrmus", powerInWatts: 5 },
    MP: { name: "Iphone 16 Pro Max", powerInWatts: 30 },
    DV: { name: "Dyson V15 tolmuimeja", powerInWatts: 230 },
    DA: { name: "Dyson Airwrap", powerInWatts: 1300 },
    IPL: { name: "Lumea fotoepilaator", powerInWatts: 240 },
    MX: { name: "KitchenAid lauamikser", powerInWatts: 300 }
}

export type Device = keyof typeof devices

export type ISODate = `${number}-${number}-${number}`

export type DayPricesCentsPerKWh = number[]

export type TimeAndPrice = { timestamp: number; price: number }

export type EleringPrices = Record<Country, TimeAndPrice[]>

export type FormattedTimeAndPrice = { time: string; price: number }

export type Lang = typeof langs[number]