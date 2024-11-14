import {describe, expect, it, vi} from "vitest"
import {changeLang, t} from "../i18n/Language"
import langs from '../i18n/langs.json'
import LangSwitcher from "./LangSwitcher.svelte"
import {fireEvent, render} from "@testing-library/svelte"
import {tick} from "svelte";

vi.mock('../i18n/Language', async () => {
    const actual = await vi.importActual('../i18n/Language')
    return {...actual, changeLang: vi.fn()}
})

describe('LangSwitcher', () => {
    it('renders language options correctly', () => {
        const {container} = render(LangSwitcher)
        const options = container.querySelectorAll('option')

        expect(options).toHaveLength(langs.length)
        expect(options[0]).toHaveValue('en')
        expect(options[0]).toHaveTextContent('English')
        expect(options[1]).toHaveValue('et')
        expect(options[1]).toHaveTextContent('Estonian')
    })

    it('can change language', async () => {
        const {container} = render(LangSwitcher)
        const select = container.querySelector('.country-select') as HTMLSelectElement

        expect(select).toBeInTheDocument()
        expect(select.value).toEqual('en')

        const secondOption = select.querySelector('option[value="et"]') as HTMLOptionElement

        expect(secondOption).toBeInTheDocument()

        await fireEvent.change(select, {target: {value: secondOption.value}})
        await tick()

        expect(select.value).toEqual('et')
        expect(changeLang).toBeCalledWith('et')
    })
})
