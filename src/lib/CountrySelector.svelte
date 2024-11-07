<script lang="ts">
    const countryCodes = ['ee', 'lv', 'lt', 'fi']
    export let countryCode = countryCodes[0]
    export let className: string
</script>

<div class={className}>
    <label for="countryCode">Vali riik</label>
    <select id="countryCode" bind:value={countryCode}>
        {#each countryCodes as countryCode}
            <option value={countryCode}>{countryCode.toUpperCase()}</option>
        {/each}
    </select>
</div>