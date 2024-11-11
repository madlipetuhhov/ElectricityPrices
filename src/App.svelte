<script lang="ts">

    import DataFetcher from "./lib/DataFetcher.svelte";
    import CountrySelector from "./lib/CountrySelector.svelte";
    import Chart from "./lib/Chart.svelte";
    import {formatTimeAndPrice} from "./utils/DataFormatter";
    import DateSwitcher from "./lib/DateSwitcher.svelte";

    let countryCode = 'ee'
    let date = new Date().toISOString().replace(/T.*/, '')
    export let prices: { timestamp: number, price: number }[] = []
    export let formattedTimeAndPrice: { time: string, price: string }[] = []

    $: formattedTimeAndPrice = formatTimeAndPrice(prices);
</script>

<!--todo: add loading view-->
<main class="container">
    <header>
        <!--todo: DataFetcher viia ts failiks, sest ei renderda-->
        <DataFetcher {date} {countryCode} bind:prices/>
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
