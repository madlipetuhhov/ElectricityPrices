import {describe, expect, it} from "vitest";
import DeviceSelector from "./DeviceSelector.svelte";
import {fireEvent, render} from "@testing-library/svelte";

describe('DeviceSelector', () => {
    const {container} = render(DeviceSelector)
    it('should render default text', () => {
        const option = container.querySelector('.default-option') as HTMLOptionElement
        expect(option.textContent).toBe('Choose device')
    })

    it('should render right amount of options', () => {
        expect(container.querySelectorAll('.device-option').length).toBe(7)
    })

    it('should render correct option labels', () => {
        const options = container.querySelectorAll('.device-option')
        expect(options[0].textContent).toBe('Mercedes Benz EQE (7200 watts)')
        expect(options[1].textContent).toBe('Oura ring (5 watts)')
    })

    it('should update the selected device', async () => {
        const selector = container.querySelector('.device-select') as HTMLSelectElement

        await fireEvent.change(selector, {target: {value: 'IPL'}})

        expect(selector.value).toBe('IPL')
    })


})