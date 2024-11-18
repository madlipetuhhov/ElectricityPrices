<script lang="ts">
    import CountrySelector from "./lib/CountrySelector.svelte";
    import Chart from "./lib/Chart.svelte";
    import DateSwitcher from "./lib/DateSwitcher.svelte";
    import {fetchData, getPricesForCountry} from "./utils/DataFetcher";
    import type {Country, DayPricesCentsPerKWh, Devices, EleringPrices, ISODate} from "./utils/Types";
    import {t} from "./i18n/Language";
    import LangSwitcher from "./lib/LangSwitcher.svelte";
    import DeviceSelector from "./lib/DeviceSelector.svelte";
    import DeviceChargingInfo from "./lib/DeviceInfo.svelte";

    export let dayPricesForCountry: DayPricesCentsPerKWh
    export let selectedDeviceCode: string

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
        <div class="loading">{t.loading}</div>
    {/if}
    <header>
        <h1 class="main-header">{t.title}</h1>
    </header>
    <div class="bar-container">
        <div class="selector-container">
            <DateSwitcher bind:date/>
            <CountrySelector bind:countryCode/>
            <LangSwitcher/>
        </div>
        <div class="device-container">
            <DeviceSelector bind:selectedDeviceCode/>
            <DeviceChargingInfo {dayPricesForCountry} {selectedDeviceCode}/>
        </div>
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

    .bar-container {
        display: flex;
        flex-direction: column;
        gap: 3em;
        max-width: 61em;
    }

    .selector-container, .device-container {
        display: flex;
        align-items: center;
        gap: 5em;
        background-color: #E6ADB7;
        border-radius: 7px;
        padding: 2.5em;
    }

    .selector-container {
        justify-content: space-between;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2em;
    }

    .loading {
        font-size: 3em;
        font-weight: 600;
        color: #B88A92;
    }
</style>