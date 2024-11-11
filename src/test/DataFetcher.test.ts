import {beforeEach, describe, expect, it, vi} from "vitest"
import {act, render} from "@testing-library/svelte"
import type {Country, EleringPrices, ISODate} from "../utils/types"
import {tick} from "svelte"
import {fetchData, getFetchUrl, getPricesForCountry} from "../utils/DataFetcher"

beforeEach(() => {
    vi.clearAllMocks()
})

const testResponseData = {
    success: true,
    data: {
        'ee': [
            {timestamp: 1730890800, price: 74.8300},
            {timestamp: 1730894400, price: 89.2300},
        ],
        'lv': [
            {timestamp: 1730890800, price: 74.8300},
            {timestamp: 1730894400, price: 89.2300},
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
})

describe('fetchData', () => {
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
    it('should return prices and times for specific country', () => {
        const countryCode: Country = 'ee'

        const result = getPricesForCountry(testResponseData.data, countryCode)

        expect(result).toEqual(testResponseData.data[countryCode])
    })
})

