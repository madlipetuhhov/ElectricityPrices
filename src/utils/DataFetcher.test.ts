import {describe, expect, it, vi} from "vitest"
import type {Country, DayPricesCentsPerKWh, EleringPrices, ISODate} from "./Types"
import {tick} from "svelte"
import {fetchData, getFetchUrl, getPricesForCountry} from "./DataFetcher"

const testResponseData = {
    success: true,
    data: {
        'ee': [
            {timestamp: 1730890800, price: 74.8300},
            {timestamp: 1730894400, price: 89.2300},
        ],
        'lv': [
            {timestamp: 1730890800, price: 75.5000},
            {timestamp: 1730894400, price: 65.2300},
        ]
    } as EleringPrices
}

describe('getFetchUrl', () => {
    it('checks if data is fetched from correct URL (winter time - EET, UTC+2)', () => {
        const date: ISODate = '2024-11-05'
        const result = getFetchUrl(date)
        expect(result).toBe(`/api/nps/price?start=2024-11-04T22:00:00.000Z&end=${date}T21:59:00.000Z`)
    })

    it('checks if data is fetched from correct URL (summer time - EEST, UTC+3)', () => {
        const date: ISODate = '2024-05-05'
        const result = getFetchUrl(date)
        expect(result).toBe(`/api/nps/price?start=2024-05-04T21:00:00.000Z&end=${date}T20:59:00.000Z`)
    })

    it('should handle leap year correctly', () => {
        const date: ISODate = '2024-03-01'
        const result = getFetchUrl(date)
        expect(result).toBe(`/api/nps/price?start=2024-02-29T22:00:00.000Z&end=${date}T21:59:00.000Z`)
    })

    it('should generate correct URL for the first day of the year', () => {
        const date: ISODate = '2024-01-01'
        const result = getFetchUrl(date)
        expect(result).toBe(`/api/nps/price?start=2023-12-31T22:00:00.000Z&end=${date}T21:59:00.000Z`)
    })

})

describe('fetchData', () => {
    it('should throw an error when fetch was unsuccessful', async () => {
        vi.spyOn(window, 'fetch').mockResolvedValueOnce({
            ok: false,
            json: async () => testResponseData
        } as Response)

        const date: ISODate = '2024-11-05'
        await expect(fetchData(date)).rejects.toThrow('Failed to fetch data')
    })

    it('should throw an error when the response is unsuccessful', async () => {
        vi.spyOn(window, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => ({success: false})
        } as Response)

        const date: ISODate = '2024-11-05'
        await expect(fetchData(date)).rejects.toThrow('API returned an unsuccessful response')
    })

    it('should return correct data', async () => {
        vi.spyOn(window, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => testResponseData
        } as Response)

        const date: ISODate = '2024-11-05'
        const result = await fetchData(date)

        await tick()

        expect(result).toEqual(testResponseData.data)
    })
})

describe('getPricesForCountry', () => {
    it('should return prices for specific country', () => {
        const countryCode: Country = 'lv'
        const expectedPrices = [9.21, 7.96]
        const result = getPricesForCountry(testResponseData.data, countryCode)
        expect(result).toEqual(expectedPrices)
    })

    it('should throw an error when country code does not exist', () => {
        const countryCode: any = 'fr'
        expect(() => getPricesForCountry(testResponseData.data, countryCode)).toThrow('Country code not found')
    })
})

