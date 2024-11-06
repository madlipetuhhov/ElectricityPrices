import {describe, it, expect} from "vitest";
import {render} from "@testing-library/svelte";
import DataMapper from "../lib/DataMapper.svelte";


describe('DataMapper', () => {
    it('should return time hh:mm and price cent/kWh', () => {
        const testData = [
            {timestamp: 1730890800, price: 74.8300},
            {timestamp: 1730894400, price: 89.2300},
        ]
        const {component} = render(DataMapper, {prices: testData})
        const result = component.formatTimeAndPrice(testData)
        const expectedData = [
            {time: '13:00', price: 9.13},
            {time: '14:00', price: 10.89},
        ]
        expectedData.forEach((expected, index) => {
            expect(result[index].time).toBe(expected.time)
            expect(result[index].price).toBeCloseTo(expected.price, 2)
        })
    })
})