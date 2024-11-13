import {describe, expect, it, vi} from "vitest"
import langs from "./langs.json";
import {getLangCode, langCode} from "./Language";


describe('Language', () => {
    it('should apply navigator.language when it is in langs', () => {
        const result = getLangCode()
        expect(result).toContain(langCode)
        expect(langCode).toBe('en')
    })

    it('should ensure fallback works when navigator.language is not in langs', () => {
        let mockLangCode = 'fr'
        vi.spyOn(navigator, 'language', 'get').mockReturnValue(mockLangCode)

        const result = getLangCode()

        expect(result).toBe('en')
    })

})