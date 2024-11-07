import {beforeEach, describe, expect, it, vi} from "vitest";
import {render, waitFor} from "@testing-library/svelte";
import DataFetcher from "../lib/DataFetcher.svelte";
import type {EleringPrices} from "../lib/types";

describe('DataFetcher', async () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    const testResponseData = { // TODO: use types
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
        } as EleringPrices,
    }

    it('should fetch data from external API and pass it as a prop to the component', async () => {
        const fetchSpy = vi.spyOn(window, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => testResponseData
        } as Response)

        const date = '2024-11-06'; // TODO: summer time
        render(DataFetcher, {date, countryCode: 'ee'})

        await waitFor(() => {
            expect(fetchSpy).toHaveBeenCalledWith(
                `https://dashboard.elering.ee/api/nps/price?start=2024-11-05T22:00:00.000Z&end=${date}T23:59:59.999Z`
            )

            // TODO: check that data is correct
        });
    })

})
