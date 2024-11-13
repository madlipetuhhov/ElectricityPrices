<script lang="ts">
    import {countries, type Country} from "../utils/Types";
    import {t} from "../i18n/Language";

    const countryCodes = Object.keys(countries) as Country[]
    export let countryCode = countryCodes[0]
</script>

<div class="country-container">
    <select class="country-select" id="countryCode" bind:value={countryCode}>
        {#each countryCodes as countryCode}
            <option class="country-option" value={countryCode}>{t.countries[countryCode]}</option>
        {/each}
    </select>
</div>

<style>
    .country-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1em;
    }

    .country-select {
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

    .country-select:hover {
        background-color: #806066;
    }

    .country-select:focus {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

</style>