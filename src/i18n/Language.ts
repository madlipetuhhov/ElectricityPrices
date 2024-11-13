import type et from './et.json'
import langs from './langs.json'

type Lang = typeof langs[number]
export let langCode: Lang = getLangCode()
export let t: typeof et = await loadTranslation(langCode)

export function getLangCode(): Lang {
    let langCode: Lang = navigator.language.split('-')[0]
    if (langs.indexOf(langCode) < 0) langCode = langs[0]
    return langCode
}

export async function loadTranslation(langCode: Lang) {
    return await import(`./${langCode}.json`)
}

export function changeLang(lang: Lang) {
    // save
    // reload
//     kutsun selle valja lang komponendis
}