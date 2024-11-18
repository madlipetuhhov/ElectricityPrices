import {describe, expect, it, vi} from "vitest";
import {calcChargingCost} from "./DeviceEnergyPriceCalc";
import type {Device} from "./Types";

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



