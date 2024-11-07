<script lang="ts">

    import DataFetcher from "./lib/DataFetcher.svelte";
    import CountrySelector from "./lib/CountrySelector.svelte";
    import Chart from "./lib/Chart.svelte";
    import DataMapper from "./lib/DataMapper.svelte";

    let countryCode = 'ee'
    let date = new Date().toISOString().replace(/T.*/, '')
    export let prices: { timestamp: number, price: number }[] = []
    export let formattedTimeAndPrice: { time: string, price: number }[] = []

</script>

<main>
    <input type="date" bind:value={date}>
    <CountrySelector className="country-selector" bind:countryCode/>
    <DataFetcher {date} {countryCode} bind:prices/>
    <DataMapper {prices} bind:formattedTimeAndPrice/>
    <Chart {formattedTimeAndPrice}/>

    <!--    <pre>{JSON.stringify(prices, null, 2)}</pre>-->
</main>

<style>
div.country-selector{

}

</style>
