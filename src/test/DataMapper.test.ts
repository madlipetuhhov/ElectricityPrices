import {expect, test} from "vitest";
import CountrySelector from "../lib/CountrySelector.svelte";
import {fireEvent, render, screen} from "@testing-library/svelte";


test('should map time as hh:mm', () => {
    const {container} = render(CountrySelector, {countryCode: 'lv'})
    expect(container.querySelector('select')!.value).toEqual('lv')

})