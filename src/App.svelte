<script lang="ts">

    import PriceFetcher from "./lib/PriceFetcher.svelte";
    import CountrySelector from "./lib/CountrySelector.svelte";
    import Chart from "./lib/Chart.svelte";
    import type {CountryPrices} from "./store/store";

    let countryCode = 'ee'
    let date = new Date().toISOString().replace(/T.*/, '')
    let prices: CountryPrices
</script>

<main>
    <input type="date" bind:value={date}>
    <CountrySelector bind:countryCode/>
    <PriceFetcher {date} {countryCode} bind:prices/>

    {JSON.stringify(prices)}

    <!--    <Chart/>-->
</main>

<style>

</style>
