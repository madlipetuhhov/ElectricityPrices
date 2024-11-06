<script lang="ts">
    export let prices: { timestamp: number, price: number }[] = []
    export let formattedTimeAndPrice: { time: string, price: number }[] = []

    function convertEuroMWhToCentKWh(priceInEuroMWh: number): number {
        const convertedPrice = ((priceInEuroMWh * 100) / 1000) * 1.22;
        return parseFloat(convertedPrice.toFixed(2))
    }

    $: formattedTimeAndPrice = prices.map(({timestamp, price}) => {
        const date = new Date(timestamp * 1000)
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const time = `${hours}:${minutes}`

        const convertedPrice = convertEuroMWhToCentKWh(price)
        return {time, price: convertedPrice}
    })

</script>

<!--<div>-->
<!--    {#each formattedTimeAndPrice as {time, price}}-->
<!--        <li>{time}: {price} EUR</li>-->
<!--    {/each}-->
<!--</div>-->

