<script lang="ts">
    export let formattedTimeAndPrice: { time: string, price: string }[] = []
    console.log(formattedTimeAndPrice)


</script>
<!--todo: negatiivsed hinnad-->

<div class="chart-container">
    <div class="y-axis-label">Hind (s/kWh)</div>
    <div class="chart">
        {#each formattedTimeAndPrice as {time, price}}
            <div class="bar" style="height: {price}em">
                <div class="bar-price">{price} s/kWh</div>
                <div class="bar-label">{time}</div>
            </div>
        {/each}
    </div>
</div>

<style>
    .chart-container {
        position: relative;
        margin-top: 15em;
    }

    .chart {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
        border-left: 0.1em solid #B3868E;
        border-bottom: 0.1em solid #B3868E;
        box-sizing: border-box;
    }

    .bar {
        width: 4.5em;
        background-color: #E6ADB7;
        text-align: center;
        position: relative;
        margin: 0.2em 0.6em 0 0.6em;
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
        transition: background-color 0.3s ease, height 0.3s ease;

    }

    .bar:hover {
        background-color: #CC9AA2;
    }

    .bar-label {
        position: absolute;
        bottom: -2em;
        width: 100%;
        font-size: 1.3em;
        font-weight: 600;
        text-align: center;
    }

    .bar-price {
        position: absolute;
        top: -4em;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1.3em;
        font-weight: 600;
        line-height: 1.2;
        text-align: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        background-color: #664D51;
        color: #FFF9FA;
        padding: 0.5em 0.8em;
        border-radius: 7px;
    }

    .bar:hover .bar-price {
        opacity: 1;
    }

    .y-axis-label {
        position: absolute;
        left: 0;
        top: -10%;
        transform: translateY(-50%);
        font-size: 1.3em;
        font-weight: 600;
        border-radius: 7px;
    }

</style>