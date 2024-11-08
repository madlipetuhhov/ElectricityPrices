<script lang="ts">
    const countryCodeToName: Record<string, string> = {
        ee: 'Eesti',
        lv: 'Läti',
        lt: 'Leedu',
        fi: 'Soome'
    }
    const countryCodes = Object.keys(countryCodeToName)
    export let countryCode = countryCodes[0]
</script>

<div class="country-wrapper">
    <label class="country-label" for="countryCode">Vali riik</label>
    <select class="country-select" id="countryCode" bind:value={countryCode}>
        {#each countryCodes as countryCode}
            <option class="country-option" value={countryCode}>{countryCodeToName[countryCode]}</option>
        {/each}
    </select>
</div>

<style>
    .country-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2em;
    }

    .country-label {
        font-size: 1.7em;
        font-weight: 600;
    }

    .country-select {
        cursor: pointer;
        padding: 0.3em 0.6em;
        font-size: 1.7em;
        font-weight: 600;
        color: #FFF9FA;
        background-color: #664D51;
        border: none;
        border-radius: 7px;
        outline: none;
    }

    .country-select:focus {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

</style>