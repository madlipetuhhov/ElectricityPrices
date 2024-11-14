import {afterEach, describe, expect, it, vi} from "vitest"
import en from './en.json'
import et from './et.json'
import {changeLang, detectLang, loadTranslation} from "./Language"
import type {Lang} from "../utils/Types"

afterEach(() => {
    sessionStorage.clear()
})

describe('detectLang', () => {
    it('should return the language from sessionStorage if available', () => {
        sessionStorage.setItem('selectedLang', 'et')
        const result = detectLang()
        expect(result).toBe('et')
    });

    it('should return the language from navigator.language if sessionStorage language is not available', () => {
        vi.spyOn(navigator, 'language', 'get').mockReturnValue('et')
        const result = detectLang()
        expect(result).toBe('et')
    })

    it('should return the fallback language if sessionStorage and navigator.language are not valid', () => {
        vi.spyOn(navigator, 'language', 'get').mockReturnValue('fr')
        const result = detectLang()
        expect(result).toBe('en')
    })
})

describe('loadTranslation', () => {
    it('should load the correct translation file for the selected language', async () => {
        const result = await loadTranslation('et')
        expect(result.title).toEqual(et.title)
    })

    it('should log an error and fall back to the default translation file if import fails', async () => {
        vi.spyOn(console, 'error')

        const result = await loadTranslation('fr')

        expect(result).to.deep.equal(en)
        expect(console.error).toHaveBeenCalledWith(`Failed to load translation for language: fr`)
    })
})

describe('changeLang', () => {
    it('should set the correct langCode in sessionStorage and reload the page', () => {
        vi.stubGlobal('location', {reload: vi.fn()})

        changeLang('en')

        expect(sessionStorage.getItem('selectedLang')).toEqual('en')
        expect(location.reload).toHaveBeenCalled()
    })
})