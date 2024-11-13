import {beforeEach, describe, expect, it, vi} from "vitest"
import {getLangCode, loadTranslation} from "./Language"

beforeEach(() => {
    vi.clearAllMocks()
})

describe('getLangCode', () => {
    it('should extract language code correctly from navigator.language (with region)', () => {
        let navigatorLang = 'en-US'
        vi.spyOn(navigator, 'language', 'get').mockReturnValue(navigatorLang)

        const result = getLangCode()

        expect(result).toBe('en')
    })

    it('should apply navigator.language when it is in langs', () => {
        let mockLangCode = 'en'
        vi.spyOn(navigator, 'language', 'get').mockReturnValue(mockLangCode)

        const result = getLangCode()

        expect(result).toContain(mockLangCode)
        expect(result).toBe(mockLangCode)
    })

    it('should ensure fallback works when navigator.language is not in langs', () => {
        let mockLangCode = 'fr'
        vi.spyOn(navigator, 'language', 'get').mockReturnValue(mockLangCode)

        const result = getLangCode()

        expect(result).toBe('en')
    })

    it('should use the fallback language when navigator.language is undefined or empty', () => {
        let emptyLangCode = ''
        vi.spyOn(navigator, 'language', 'get').mockReturnValue(emptyLangCode)

        const result = getLangCode()

        expect(result).toBe('en')
    })
})

describe('loadTranslation', () => {
    it('should load the correct translation file for the selected language', async () => {
        const mockLangCode = 'et'
        const mockEstonianTranslation = { title: 'Elektrihinnad' }
        vi.mock('../et.json', () => Promise.resolve(mockEstonianTranslation))

        const result = await loadTranslation(mockLangCode)

        expect(result.title).toEqual(mockEstonianTranslation.title)
    })

    it('should log an error and fall back to the default translation file if import fails', async () => {
        const mockLangCode = 'fr'
        const mockFallbackTranslation = { title: 'Electricity prices' }
        vi.spyOn(console, 'error').mockImplementation(() => {})
        vi.mock('../en.json', () => Promise.resolve(mockFallbackTranslation))

        const result = await loadTranslation(mockLangCode)

        expect(result.title).toEqual(mockFallbackTranslation.title)
        expect(console.error).toHaveBeenCalledWith(`Failed to load translation for language: ${mockLangCode}`)
    })

})