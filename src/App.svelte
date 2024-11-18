<script lang="ts">
    import CountrySelector from "./lib/CountrySelector.svelte";
    import Chart from "./lib/Chart.svelte";
    import DateSwitcher from "./lib/DateSwitcher.svelte";
    import {fetchData, getPricesForCountry} from "./utils/DataFetcher";
    import type {Country, DayPricesCentsPerKWh, EleringPrices, ISODate} from "./utils/Types";
    import {t} from "./i18n/Language";
    import LangSwitcher from "./lib/LangSwitcher.svelte";
    import DeviceSelector from "./lib/DeviceSelector.svelte";

    export let dayPricesForCountry: DayPricesCentsPerKWh

    let countryCode: Country = 'ee'
    let date = new Date().toISOString().split('T')[0] as ISODate
    let loadedPrices: EleringPrices | undefined

    $: {
        fetchData(date).then((r) => {
            loadedPrices = r
            if (loadedPrices) {
                dayPricesForCountry = getPricesForCountry(loadedPrices, countryCode)
            }
        })
    }
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
        <DeviceSelector/>
        <LangSwitcher/>
    </div>
    <div class="bar-chart">
        <Chart {dayPricesForCountry}/>
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