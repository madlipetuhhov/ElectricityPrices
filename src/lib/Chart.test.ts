import {describe, expect, it} from "vitest"
import {calcDailyMaxPrice, calcDailyMinPrice} from "./Chart.svelte"
import type {DayPricesCentsPerKWh} from "../utils/Types"

describe('Chart', () => {
    const prices: DayPricesCentsPerKWh = [5.12, 12.12, -5.55]

    it('should calculate dailyMax price correctly', () => {
        const result = calcDailyMaxPrice(prices)
        expect(result).toBe(12.12)
    })

    it('should calculate dailyMax price correctly', () => {
        const result = calcDailyMinPrice(prices)
        expect(result).toBe(-5.55)
    })
//     todo: more tests
})