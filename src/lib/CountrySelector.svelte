<script lang="ts">
    const countryCodes = ['ee', 'lv', 'lt', 'fi']
    export let countryCode = countryCodes[0]
</script>

<div class="country-wrapper">
    <label class="country-label" for="countryCode">Vali riik</label>
    <select class="country-select" id="countryCode" bind:value={countryCode}>
        {#each countryCodes as countryCode}
            <option value={countryCode}>{countryCode.toUpperCase()}</option>
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
        font-size: 1.5em;
        font-weight: 600;

    }

    .country-select {
        cursor: pointer;
        padding: 0.5em 0.8em;
        font-size: 1.4em;
        font-weight: 600;
        color: #FFF9FA;
        background-color:#664D51;
        border: none;
        border-radius: 7px;
        outline: none;
        transition: background-color 0.3s ease;
    }

    .country-select:focus {
        background-color: #664D51;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    .country-select option {
        background-color: #664D51;
        color: #FFF9FA;
        transition: background-color 0.3s ease;
    }

</style>