import {expect, test} from "vitest";
import CountrySelector from "../lib/CountrySelector.svelte";
import {fireEvent, render, screen} from "@testing-library/svelte";

test('should render options correctly', () => {
    const {container} = render(CountrySelector, {countryCode: 'lv'})

    expect(container.querySelector('select')!.value).toEqual('lv')

    // const optionElements = screen.getAllByRole('option')
    // expect(optionElements.length).toBe(4)
    //
    // expect(optionElements[0]).toHaveTextContent('EE')
//
})


test('dropdown should update the selected country', async () => {
    render(CountrySelector);

    const selectElement = screen.getByLabelText('Vali riik') as HTMLSelectElement
    fireEvent.change(selectElement, {target: {value: 'fi'}})

    // expect(pricesStore.update).toHaveBeenCalledWith(expect.objectContaining({selectedCountry: 'fi'}))
});
