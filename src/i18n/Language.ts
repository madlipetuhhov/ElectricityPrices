import type {Lang} from '../utils/Types'
import type et from './et.json'
import langs from './langs.json'

export let langCode: Lang = getLangCode()
export let t: typeof et = await loadTranslation(langCode)

export function getLangCode(): Lang {
    const langFromSession = getLangFromSession()
    if (langFromSession) return langFromSession

    const langFromNavigator = getLangFromNavigator()
    if (langFromNavigator) return langFromNavigator

    return langs[0]
}

export function getLangFromSession(): Lang | null {
    let langFromSession = sessionStorage.getItem('selectedLang')?.trim()
    return toLang(langFromSession)
}

export function getLangFromNavigator(): string | null {
    let langFromNavigator = navigator.language.split('-')[0]
    return toLang(langFromNavigator)
}

function toLang(lang?: string): Lang | null {
    if (!lang || !langs.includes(lang)) return null
    return lang as Lang;
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