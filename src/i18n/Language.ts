import type {Lang} from '../utils/Types'
import type et from './et.json'
import langs from './langs.json'

export let langCode: Lang = detectLang()
export let t: typeof et = await loadTranslation(langCode)

export function detectLang(): Lang {
    const lang = ensureSupportedLang(sessionStorage['selectedLang'] ?? navigator.language.split('-')[0])
    return lang ?? langs[0]
}

function ensureSupportedLang(lang?: string): Lang | undefined {
    if (!lang || !langs.includes(lang)) return
    return lang as Lang
}

export async function loadTranslation(langCode: Lang) {
    try {
        return (await import(`./${langCode}.json`)).default
    } catch (error) {
        console.error(`Failed to load translation for language: ${langCode}`)
        return (await import('./en.json')).default
    }
}

export function changeLang(langCode: Lang) {
    sessionStorage.setItem('selectedLang', langCode)
    window.location.reload()
}
