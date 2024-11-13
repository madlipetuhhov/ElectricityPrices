import {beforeEach, describe, expect, it, vi} from "vitest"
import {
    getLangCode,
    getLangFromNavigator,
    getLangFromSession,
    loadTranslation,
    changeLang
} from "./Language"
import type {Lang} from "../utils/Types"

beforeEach(() => {
    vi.clearAllMocks()
})

describe('getLangFromSession', () => {
    it('should return the language from sessionStorage if available', () => {
        sessionStorage.setItem('selectedLang', 'fr')
        const result = getLangFromSession()
        expect(result).toBe('fr')
    })

    it('should return null if no language is set in sessionStorage', () => {
        sessionStorage.removeItem('selectedLang')
        const result = getLangFromSession()
        expect(result).toBeNull()
    })
})

describe('getLangFromNavigator', () => {
    it('should return the correct language code from navigator.language', () => {
        vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-US')
        const result = getLangFromNavigator()
        expect(result).toBe('en')
    })

    it('should return null if no language is set in navigator.language', () => {
        vi.spyOn(navigator, 'language', 'get').mockReturnValue('')
        const result = getLangFromNavigator()
        expect(result).toBeNull()
    })
})

describe('getLangCode', () => {
    it('should return the language from sessionStorage if available', () => {
        sessionStorage.setItem('selectedLang', 'et')
        const result = getLangCode()
        expect(result).toBe('et')
    });

    it('should return the language from navigator.language if sessionStorage language is not available', () => {
        sessionStorage.removeItem('selectedLang')
        vi.spyOn(navigator, 'language', 'get').mockReturnValue('et')
        const result = getLangCode()
        expect(result).toBe('et')
    })

    it('should return the fallback language if sessionStorage and navigator.language are not valid', () => {
        sessionStorage.removeItem('selectedLang')
        vi.spyOn(navigator, 'language', 'get').mockReturnValue('fr')
        const result = getLangCode()
        expect(result).toBe('en')
    })
})

describe('loadTranslation', () => {
    it('should load the correct translation file for the selected language', async () => {
        const mockLangCode = 'et'
        const mockEstonianTranslation = {title: 'Elektrihinnad'}
        vi.mock('../et.json', () => Promise.resolve(mockEstonianTranslation))

        const result = await loadTranslation(mockLangCode)

        expect(result.title).toEqual(mockEstonianTranslation.title)
    })

    it('should log an error and fall back to the default translation file if import fails', async () => {
        const languageCode = 'fr'
        const mockFallbackTranslation = {title: 'Electricity prices'}
        vi.spyOn(console, 'error').mockImplementation(() => {})
        vi.mock('../en.json', () => Promise.resolve(mockFallbackTranslation))

        const result = await loadTranslation(languageCode)

        expect(result.title).toEqual(mockFallbackTranslation.title)
        expect(console.error).toHaveBeenCalledWith(`Failed to load translation for language: ${languageCode}`)
    })
})

describe('changeLang', () => {
    it('should set the correct langCode in sessionStorage and reload the page', () => {
        sessionStorage.clear()
        vi.stubGlobal('location', {reload: vi.fn()})
        const langCode: Lang = 'en'

        changeLang(langCode)

        expect(sessionStorage.getItem('selectedLang')).toEqual('en')
        expect(location.reload).toHaveBeenCalled()
    })
})