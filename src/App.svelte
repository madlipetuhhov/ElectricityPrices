<script lang="ts">

    import PriceFetcher from "./lib/PriceFetcher.svelte";
    import CountrySelector from "./lib/CountrySelector.svelte";
    import Chart from "./lib/Chart.svelte";

    let countryCode = 'ee'
    let date = new Date().toISOString().replace(/T.*/, '')
    let prices: Record<string, any> = {}

</script>

<main>
    <input type="date" bind:value={date}>
    <CountrySelector bind:countryCode/>
    <PriceFetcher {date} {countryCode} bind:prices/>
    <Chart {prices}/>

    <pre>{JSON.stringify(prices, null, 2)}</pre>


</main>

<style>

</style>
