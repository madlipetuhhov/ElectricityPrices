<script lang="ts">
    export let formattedTimeAndPrice: { time: string, price: number }[] = []

</script>
<!--todo: negatiivsed hinnad-->

<main>
    <div class="chart-container">
        {#each formattedTimeAndPrice as {time, price}}
            <div class="bar" style="height: {price}em;">
                <div class="bar-price">{price} s/kWh</div>
                <div class="bar-label">{time}</div>
            </div>
        {/each}
    </div>
</main>

<style>


    .chart-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
        border-left: 2px solid #5B4348;
        border-bottom: 2px solid #5B4348;
        box-sizing: border-box;
    }

    .bar {
        width: 45px;
        background-color: #e4a7b3;
        text-align: center;
        position: relative;
        transition: height 0.3s ease;
        margin: 5px 5px 0 5px;
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
    }

    .bar-label {
        position: absolute;
        bottom: -2em;
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
        color: #5B4348;
        margin-top: 5px;
    }
</style>