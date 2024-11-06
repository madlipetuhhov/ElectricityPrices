<script lang="ts">
    export let prices: { timestamp: number, price: number }[] = [];

    $: formattedData = prices.map(({timestamp, price}) => {
        const date = new Date(timestamp * 1000);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const time = `${hours}:${minutes}`;
        return {time, price};
    });
</script>

<div>
    {#each formattedData as {time, price}}
        <li>{time}: {price} EUR</li>
    {/each}
</div>

