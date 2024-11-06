<script lang="ts">
    export let formattedTimeAndPrice: { time: string, price: number }[] = []

</script>

<div class="chart-container">
    {#each formattedTimeAndPrice as { time, price }}
        <div class="bar" style="height: {price * 2}px;">
            <div class="bar-price">€{price}</div>
            <div class="bar-label">{time}</div>
        </div>
    {/each}
</div>

<style>
    .chart-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
        height: 300px;
        border-left: 2px solid #333;
        border-bottom: 2px solid #333;
        margin: 20px 0;
        padding: 10px;
        box-sizing: border-box;
    }

    .bar {
        width: 50px;
        background-color: #4caf50;
        text-align: center;
        position: relative;
        transition: height 0.3s ease;
    }

    .bar-label {
        position: absolute;
        bottom: -20px;
        width: 100%;
        font-size: 12px;
        text-align: center;
    }

    .bar-price {
        position: absolute;
        top: -20px;
        width: 100%;
        font-size: 12px;
        text-align: center;
    }

    .chart-container span {
        font-size: 14px;
        color: #333;
        margin-top: 5px;
    }
</style>