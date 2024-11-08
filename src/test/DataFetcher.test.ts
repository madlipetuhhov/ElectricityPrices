import {beforeEach, describe, expect, it, vi} from "vitest";
import {act, render, waitFor} from "@testing-library/svelte";
import DataFetcher from "../lib/DataFetcher.svelte";
import type {EleringPrices} from "../utils/types";

describe('DataFetcher', async () => {
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

    // TODO: check that data is correct
    it('checks if data is fetched from correct URL (winter time - EET, UTC+2)', async () => {
        const fetchSpy = vi.spyOn(window, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => testResponseData
        } as Response)

        const date = '2024-11-05'
        render(DataFetcher, {date, countryCode: 'ee'})

        await act(() => fetchSpy)

        expect(fetchSpy).toHaveBeenCalledWith(`/api/nps/price?start=2024-11-04T22:00:00.000Z&end=${date}T21:59:00.000Z&country=ee`);
    })

    it('checks if data is fetched from correct URL (summer time - EEST, UTC+3)', async () => {
        const fetchSpy = vi.spyOn(window, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => testResponseData
        } as Response)

        const date = '2024-05-05'
        render(DataFetcher, {date, countryCode: 'ee'})

        await act(() => fetchSpy)

        expect(fetchSpy).toHaveBeenCalledWith(
            `/api/nps/price?start=2024-05-04T21:00:00.000Z&end=${date}T20:59:00.000Z&country=ee`
        )
    });
})

//         it('should fetch data from external API and pass it as a prop to the component', async () => {
//         const fetchSpy = vi.spyOn(window, 'fetch').mockReturnValue(Promise.resolve({
//             json: () => Promise.resolve(testResponseData)
//         } as Response))
//
//         const date = '2024-11-06';
//         const countryCode = 'ee';
//
//         // Act (state 1)
//         const {container} = render(ElectricityPrices, {date, countryCode});
//
//         expect(fetchSpy).toHaveBeenCalledWith(
//             'https://dashboard.elering.ee/api/nps/price?start=2024-11-05T22:00:00.000Z&end=2024-11-06T21:59:00.000Z'
//         );
//
//         await act(() => fetchSpy) //svelte jargmine samm
//         await tick()
//
//         // assert that data was received/rendered
//         expect(container.querySelectorAll('.bar')).to.have.length(2)
//     });
