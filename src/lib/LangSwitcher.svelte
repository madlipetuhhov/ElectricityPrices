<script lang="ts">
    import {changeLang, langCode, t} from "../i18n/Language.js"
    import langs from "../i18n/langs.json"
</script>

<select value={langCode} on:change={(event) => changeLang(event.currentTarget.value)}>
    {#each langs as langCode}
        <option value={langCode}>{t.languages[langCode]}</option>
    {/each}
</select>

<style>
    select {
        cursor: pointer;
        padding: 0.4em 0.7em;
        font-size: 1.6em;
        font-weight: 600;
        color: #FFF9FA;
        background-color: #664D51;
        border: none;
        border-radius: 7px;
        outline: none;
    }

    select:hover {
        background-color: #806066;
    }

    select:focus {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
</style>