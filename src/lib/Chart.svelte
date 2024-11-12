<script lang="ts">
    import type {FormattedTimeAndPrice} from "../utils/Types";

    export let formattedTimeAndPrices: FormattedTimeAndPrice[]

    function getDailyMaxPrice(formattedTimeAndPrices: FormattedTimeAndPrice[]): number {
        return Math.max(...formattedTimeAndPrices.map(i => +i.price))
    }

    $: dailyMax = getDailyMaxPrice(formattedTimeAndPrices)

</script>
<!--todo: negatiivsed hinnad-->

<div class="chart-container">

    <div class="y-axis-labels">
        <div class="y-axis-line" style="top: 0%;"></div>
        <div class="y-axis-line" style="top: 25%;"></div>
        <div class="y-axis-line" style="top: 50%;"></div>
        <div class="y-axis-line" style="top: 75%;"></div>

        <div class="y-axis-label" style="top: 0%;">{Math.round(dailyMax)} s/kWh</div>
        <div class="y-axis-label" style="top: 25%;">{Math.round(0.75 * dailyMax)} s/kWh</div>
        <div class="y-axis-label" style="top: 50%;">{Math.round(0.5 * dailyMax)} s/kWh</div>
        <div class="y-axis-label" style="top: 75%;">{Math.round(0.25 * dailyMax)} s/kWh</div>
        <div class="y-axis-label" style="top: 100%;">0 s/kWh</div>
    </div>

    <div class="chart">
        {#each formattedTimeAndPrices as {time, price}}
            <div class="bar" style="height: {price / dailyMax * 100}%">
                <div class="bar-price">{price} s/kWh</div>
                <div class="bar-label">{time}</div>
            </div>
        {/each}
    </div>
</div>

<style>
    .chart-container {
        position: relative;
        margin-top: 10em;
    }

    .chart {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
        border-left: 0.1em solid #B3868E;
        border-bottom: 0.1em solid #B3868E;
        box-sizing: border-box;
        height: 40em;
    }

    .bar {
        width: 4em;
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
        font-size: 1.2em;
        font-weight: 600;
        text-align: center;
    }

    .bar-price {
        position: absolute;
        top: -4em;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1.2em;
        font-weight: 600;
        line-height: 1.2;
        text-align: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        background-color: #664D51;
        color: #FFF9FA;
        padding: 0.4em 0.7em;
        border-radius: 7px;
    }

    .bar:hover .bar-price {
        opacity: 1;
    }

    .y-axis-labels {
        position: absolute;
        left: 0;
        width: 100%;
        font-size: 1.2em;
        font-weight: 600;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

    .y-axis-line {
        position: absolute;
        left: 0;
        width: 100%;
        height: 0;
        border-top: 0.1em dotted #B3868E;
    }

    .y-axis-label {
        position: absolute;
        left: -5em;
        transform: translateY(-50%);
        width: 100%;
        text-align: left;
    }

</style>