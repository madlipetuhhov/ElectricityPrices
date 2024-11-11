<script lang="ts">
    import CountrySelector from "./lib/CountrySelector.svelte";
    import Chart from "./lib/Chart.svelte";
    import {formatTimeAndPrice} from "./utils/DataFormatter";
    import DateSwitcher from "./lib/DateSwitcher.svelte";
    import {fetchData, getPricesForCountry} from "./utils/DataFetcher";
    import type {Country, EleringPrices, FormattedTimeAndPrice, ISODate, PriceWithTime} from "./utils/types";

    export let prices: PriceWithTime[] = []
    export let formattedTimeAndPrice: FormattedTimeAndPrice[] = []

    let countryCode: Country = 'ee'
    let date = new Date().toISOString().split('T')[0] as ISODate
    let loadedPrices: EleringPrices | undefined

    $: fetchData(date).then(r => loadedPrices = r)
    $: {
        if (loadedPrices) prices = getPricesForCountry(loadedPrices, countryCode)
    }
    $: formattedTimeAndPrice = formatTimeAndPrice(prices)
</script>

<main class="container">
    {#if !loadedPrices}
        <div class="loading">Loading...</div>
    {/if}
    <header>
        <h1 class="main-header">Elektri hinnad</h1>
    </header>
    <div class="date-country-selection">
        <DateSwitcher bind:date/>
        <CountrySelector bind:countryCode/>
    </div>
    <div class="chart">
        <Chart {formattedTimeAndPrice}/>
    </div>
</main>

<style>
    .main-header {
        font-weight: 600;
        font-size: 5em;
    }

    .date-country-selection {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 5rem;
        background-color: #E6ADB7;
        border-radius: 7px;
        padding-left: 2em;
        padding-right: 2em;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2em;
    }
</style>