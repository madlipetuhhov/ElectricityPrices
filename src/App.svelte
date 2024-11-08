<script lang="ts">

    import DataFetcher from "./lib/DataFetcher.svelte";
    import CountrySelector from "./lib/CountrySelector.svelte";
    import Chart from "./lib/Chart.svelte";
    import {formatTimeAndPrice} from "./utils/dataFormatter";

    let countryCode = 'ee'
    let date = new Date().toISOString().replace(/T.*/, '')
    export let prices: { timestamp: number, price: number }[] = []
    export let formattedTimeAndPrice: { time: string, price: string }[] = []

    $: formattedTimeAndPrice = formatTimeAndPrice(prices);
</script>

<div class="container">
    <header>
        <DataFetcher {date} {countryCode} bind:prices/>
        <h1 class="main-header">Elektri hinnad</h1>
    </header>
    <div class="date-country-selection">
        <input type="date" bind:value={date}/>
        <CountrySelector bind:countryCode/>
    </div>
    <div class="chart">
        <Chart {formattedTimeAndPrice}/>
    </div>
    <!--    <pre>{JSON.stringify(prices, null, 2)}</pre>-->
</div>

<style>
    .main-header {
        font-weight: 600;
        font-size: 5em;
    }

    .date-country-selection {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 6rem;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2em;
    }
</style>
