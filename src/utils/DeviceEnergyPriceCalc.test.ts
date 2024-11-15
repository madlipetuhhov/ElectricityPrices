import {describe, expect, it, vi} from "vitest";
import {
    calcChargingCost,
    calcChargingCostPerHour
} from "./DeviceEnergyPriceCalc";
import type {Device, Devices} from "./Types";

describe('calculateChargingCost', () => {
    it('should return current hour charging cost', () => {
        vi.setSystemTime(new Date('2024-11-05T00:00:00Z'))
        const kW = 0.23
        const startHourIndex = 2
        const dayPrices = [1, 3.3, 6.2, 7.2, 8]

        const result = calcChargingCostPerHour(kW, dayPrices, startHourIndex)

        expect(result).toBe(0.01)
    })
})

describe('calcChargingCost', () => {
    it('should return total cost according to default hours and current hour', () => {
        vi.setSystemTime(new Date('2024-11-05T00:00:00Z'))
        const device = {
            watts: 230,
            hours: 3
        } as Device
        const dayPrices = [1, 3.3, 30, 130, 8, 300]

        const result = calcChargingCost(device, dayPrices)
        expect(result).toBe(0.39)
    })
})



