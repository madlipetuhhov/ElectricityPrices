import {describe, expect, it} from "vitest"
import DeviceSelector from "./DeviceSelector.svelte"
import {fireEvent, render} from "@testing-library/svelte"

describe('DeviceSelector', () => {
    it('should render default text', () => {
        const {container} = render(DeviceSelector)

        const option = container.querySelector('.default-option') as HTMLOptionElement
        expect(option.textContent).toBe('Choose device')
    })
    it('should render correct option labels', () => {
        const {container} = render(DeviceSelector)
        const options = container.querySelectorAll('.device-option')

        expect(options[0].textContent).toBe('Mercedes Benz EQE')
        expect(options[1].textContent).toBe('Oura ring')
    })

    it('should update the selected device', async () => {
        const {container} = render(DeviceSelector)
        const selector = container.querySelector('.device-select') as HTMLSelectElement

        await fireEvent.change(selector, {target: {value: 'IPL'}})

        expect(selector.value).toBe('IPL')
    })

    it('should render right amount of options', () => {
        const {container} = render(DeviceSelector)
        expect(container.querySelectorAll('.device-option').length).toBe(7)
    })
})