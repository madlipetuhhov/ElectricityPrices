import type { Lang } from '../utils/Types'
import type et from './et.json'
import langs from './langs.json'

export let langCode: Lang = getLangCode()
export let t: typeof et = await loadTranslation(langCode)

export function getLangCode(): Lang {
    const langFromSession = getLangFromSession()
    const langFromNavigator = getLangFromNavigator()

    const selectedLang = langFromSession || langFromNavigator
    return validateLangCode(selectedLang)
}

export function getLangFromSession(): string | null {
    return sessionStorage.getItem('selectedLang')?.trim() || null
}

export function getLangFromNavigator(): string {
    return navigator.language.split('-')[0]
}

export function validateLangCode(langCode: string): Lang {
    if (langs.indexOf(langCode) < 0) return langs[0]
    return langCode as Lang
}

export async function loadTranslation(langCode: Lang) {
    try {
        return await import(`./${langCode}.json`)
    } catch (error) {
        console.error(`Failed to load translation for language: ${langCode}`)
        return await import("./en.json")
    }
}

export function changeLang(langCode: Lang) {
    sessionStorage.setItem('selectedLang', langCode)
    window.location.reload()
}