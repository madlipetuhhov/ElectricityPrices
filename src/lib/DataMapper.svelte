<script lang="ts">
    export let prices: { timestamp: number, price: number }[] = []
    export let formattedTimeAndPrice: { time: string, price: string }[] = []

    function convertEuroMWhToCentKWh(priceInEuroMWh: number): number {
        const convertedPrice = ((priceInEuroMWh * 100) / 1000) * 1.22;
        return parseFloat(convertedPrice.toFixed(2))
    }

    export function formatTimeAndPrice(prices: { timestamp: number, price: number }[]) {
        return prices.map(({timestamp, price}) => {
            const date = new Date(timestamp * 1000)
            const hours = date.getHours().toString().padStart(2, '0')
            const minutes = date.getMinutes().toString().padStart(2, '0')
            const time = `${hours}:${minutes}`

            const convertedPrice = convertEuroMWhToCentKWh(price)
            return {time, price: convertedPrice.toFixed(2)}
        })
    }

    $: formattedTimeAndPrice = formatTimeAndPrice(prices)
</script>


