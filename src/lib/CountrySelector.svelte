<script lang="ts">
    import {pricesStore} from "../store/store";

    let countryCodes: string[] = ['ee', 'lv', 'lt', 'fi']

    function changeCountry(event: Event) {
        const selectedCountry = (event.target as HTMLSelectElement).value
        pricesStore.update(state => ({
            ...state,
            selectedCountry
        }))
    }
</script>

<div>
    <label for="countryCode">Vali riik</label>
    <select id="countryCode" on:change={changeCountry}>
        {#each countryCodes as countryCode}
            <option value={countryCode} selected={$pricesStore.selectedCountry === countryCode}>
                {countryCode.toUpperCase()}
            </option>
        {/each}
    </select>
</div>