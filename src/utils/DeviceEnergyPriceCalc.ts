import type {Device, DayPricesCentsPerKWh} from "./Types";

export function calcChargingCost(device: Device, dayPrices: DayPricesCentsPerKWh): number {
    const watts: number = device.watts
    const hours: number = device.hours
    let totalCost: number = 0

    const kW = convertWattsToKW(watts)
    let hourIndex = new Date().getHours()

    for (let i: number = 0; i < hours; i++) {
        totalCost += calcChargingCostPerHour(kW, dayPrices, hourIndex)
        hourIndex = (hourIndex + 1) % 24
    }

    return totalCost
}

export function calcChargingCostPerHour(kW: number, dayPrices: DayPricesCentsPerKWh, hourIndex: number): number {
    const currentHourPrice = dayPrices[hourIndex]
    const priceInEuros = (kW * currentHourPrice) / 100
    return Math.round(priceInEuros * 100) / 100
}

function convertWattsToKW(watts: number): number {
    return watts / 1000
}
