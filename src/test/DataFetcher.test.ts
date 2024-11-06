import {beforeEach, describe, expect, it, vi} from "vitest";
import {render, waitFor} from "@testing-library/svelte";
import DataFetcher from "../lib/DataFetcher.svelte";
import {tick} from "svelte";

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
        },
    }

    it('should fetch data from external API and pass it as a prop to the component', async () => {
        vi.mock('fetch', vi.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => testResponseData
        }))

        const {component} = render(DataFetcher, {
            date: '2024-11-06',
            countryCode: 'ee'
        })

        await tick()

        // TODO:
        // expect(component.prices).toEqual([
        //     {timestamp: 1730890800, price: 74.83},
        //     {timestamp: 1730894400, price: 89.23},
        // ]);
    });
})
