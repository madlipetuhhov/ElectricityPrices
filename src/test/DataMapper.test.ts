// import {describe, it, expect, test} from "vitest";
// import CountrySelector from "../lib/CountrySelector.svelte";
// import {fireEvent, render, screen} from "@testing-library/svelte";
// import DataMapper from "../lib/DataMapper.svelte";
//
//
// describe('DataMapper', () => {
//     it('should return hh:mm', () => {
//         const prices = [
//             {timestamp: 1730851200, price: 3.82},
//             {timestamp: 1730854800, price: 4.02},
//         ]
//
//         const {container} = render(DataMapper, {
//             props: {prices},
//         })
//         // Access the internal state (formattedData) of the component
//         const formattedData = component.$$.ctx[2]; // Access the formattedData in the Svelte component context
//
//         // Verify that the formattedData is correctly transformed
//         expect(formattedData).toEqual([
//             { time: '00:00', price: 3.82 },
//             { time: '01:00', price: 4.02 },
//         ]);
//     })
// })