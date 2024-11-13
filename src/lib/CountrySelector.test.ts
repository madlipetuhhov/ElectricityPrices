import {describe, expect, it} from "vitest";
import CountrySelector from "./CountrySelector.svelte";
import {fireEvent, render} from "@testing-library/svelte";

describe('CountrySelector', () => {
    it('default countryCode should be ee when no countryCode passed', () => {
        const { container } = render(CountrySelector)
        expect(container.querySelector('select')!.value).toEqual('ee')
    });

    it('should render option correctly', () => {
        const {container} = render(CountrySelector, {countryCode: 'lv'})
        expect(container.querySelector('select')!.value).toEqual('lv')
    })

    it('should render right amount of options', () => {
        const {container} = render(CountrySelector, {countryCode: 'ee'})
        const options = container.querySelectorAll('.country-option')
        expect(options.length).toBe(4)
    });

    it('should render correct option labels', () => {
        const {container} = render(CountrySelector, {countryCode: 'ee'})
        const options = container.querySelectorAll('.country-option')
        expect(options[0].textContent).toBe('Eesti')
        expect(options[1].textContent).toBe('Läti')
        expect(options[2].textContent).toBe('Leedu')
        expect(options[3].textContent).toBe('Soome')
    });

    it('dropdown should update the selected country', async () => {
        const {container} = render(CountrySelector, {countryCode: 'ee'})
        const selector = container.querySelector('.country-select') as HTMLSelectElement

        await fireEvent.change(selector, {target: {value: 'fi'}})

        expect(selector.value).toBe('fi');
    });
});
