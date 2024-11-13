import {describe, expect, it} from "vitest";
import type {FormattedTimeAndPrice} from "../utils/Types";
import {calcDailyMaxPrice, calcDailyMinPrice} from "./Chart.svelte";

describe('Chart', () => {
    const testFormattedTimesAndPrices: FormattedTimeAndPrice[] = [
        {time: '08:00', price: 5.12},
        {time: '09:00', price: 12.12},
        {time: '10:00', price: -5.55}
    ]

    it('should calculate dailyMax price correctly', () => {
        const result = calcDailyMaxPrice(testFormattedTimesAndPrices)
        expect(result).toBe(12.12)
    })

    it('should calculate dailyMax price correctly', () => {
        const result = calcDailyMinPrice(testFormattedTimesAndPrices)
        expect(result).toBe(-5.55)
    })


})