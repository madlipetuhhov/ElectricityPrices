import {describe, it, expect} from "vitest";
import {convertEuroMWhToCentKWh, addVatToPrice, formatTimeAndPrice} from "./DataFormatter";
import type {TimeAndPrice} from "./Types";

describe('convertEuroMWhToCentKWh', () => {
    it('should convert EUR/MWh to cent/kWh correctly', () => {
        const priceInEuroMWh = 74.83
        const expected = 7.483

        const result = convertEuroMWhToCentKWh(priceInEuroMWh)

        expect(result).toBeCloseTo(expected, 2)
    })

    it('should handle zero price correctly', () => {
        const priceInEuroMWh = 0
        const expected = 0

        const result = convertEuroMWhToCentKWh(priceInEuroMWh)

        expect(result).toBe(expected)
    })

    it('should handle negative price correctly', () => {
        const priceInEuroMWh = -45
        const expected = -4.5

        const result = convertEuroMWhToCentKWh(priceInEuroMWh)

        expect(result).toBe(expected)
    })
})

describe('addVatToPrice', () => {
    it('should apply 22% VAT correctly', () => {
        const priceWithoutVat = 7.483
        const expected = 9.13

        const result = parseFloat(addVatToPrice(priceWithoutVat).toFixed(2))

        expect(result).toBe(expected)
    });

    it('should handle zero price correctly', () => {
        const priceWithoutVat = 0
        const expected = 0

        const result = addVatToPrice(priceWithoutVat)

        expect(result).toBe(expected)
    });

    it('should handle negative price correctly', () => {
        const priceWithoutVat = -4.5
        const expected = -5.49

        const result = parseFloat(addVatToPrice(priceWithoutVat).toFixed(2))

        expect(result).toBe(expected)
    });

    describe('formatTimeAndPrice', () => {
        it('should format time and price correctly', () => {
            const prices: TimeAndPrice[] = [
                {timestamp: 1730844000, price: 74.83},
                {timestamp: 1730847600, price: -45},
                {timestamp: 1730851200, price: 0},
            ]

            const result = formatTimeAndPrice(prices)

            expect(result[0].time).toBe('00:00')
            expect(result[0].price).toBe(9.13)

            expect(result[1].time).toBe('01:00')
            expect(result[1].price).toBe(-5.49)

            expect(result[2].time).toBe('02:00')
            expect(result[2].price).toBe(0.00)
        });

        it('should handle empty list correctly', () => {
            const prices: TimeAndPrice[] = []

            const result = formatTimeAndPrice(prices)

            expect(result.length).toBe(0)
        });

        it('should handle one price in list correctly', () => {
            const prices: TimeAndPrice[] = [{timestamp: 1730844000, price: 74.83}]

            const result = formatTimeAndPrice(prices)

            expect(result.length).toBe(1)
            expect(result[0].time).toBe('00:00')
            expect(result[0].price).toBe(9.13)
        });
    });


})