<script lang="ts">
    import CountrySelector from "./lib/CountrySelector.svelte";
    import Chart from "./lib/Chart.svelte";
    import {formatTimeAndPrice} from "./utils/DataFormatter";
    import DateSwitcher from "./lib/DateSwitcher.svelte";
    import {fetchData, getPricesForCountry} from "./utils/DataFetcher";
    import type {Country, EleringPrices, FormattedTimeAndPrice, ISODate, TimeAndPrice} from "./utils/Types";
    import {t} from "./i18n/Language";
    import LangSwitcher from "./lib/LangSwitcher.svelte";

    export let prices: TimeAndPrice[]
    export let formattedTimesAndPrices: FormattedTimeAndPrice[]

    let countryCode: Country = 'ee'
    let date = new Date().toISOString().split('T')[0] as ISODate
    let loadedPrices: EleringPrices | undefined

    $: fetchData(date).then(r => loadedPrices = r)
    $: {
        if (loadedPrices) prices = getPricesForCountry(loadedPrices, countryCode)
    }
    $: formattedTimesAndPrices = formatTimeAndPrice(prices)
</script>

<main class="container">
    {#if !loadedPrices}
        <div class="loading">Loading...</div>
    {/if}
    <header>
        <h1 class="main-header">{t.title}</h1>
    </header>
    <div class="selector-container">
        <DateSwitcher bind:date/>
        <CountrySelector bind:countryCode/>
        <LangSwitcher/>
    </div>
    <div class="bar-chart">
        <Chart {formattedTimesAndPrices}/>
    </div>
</main>

<style>
    .main-header {
        font-weight: 600;
        font-size: 5em;
    }

    .selector-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 5rem;
        background-color: #E6ADB7;
        border-radius: 7px;
        padding-left: 2.5em;
        padding-right: 2.5em;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2em;
    }
</style>