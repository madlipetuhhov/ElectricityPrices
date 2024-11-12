<script lang="ts" module>
    export function calcDailyMaxPrice(formattedTimeAndPrices: FormattedTimeAndPrice[]): number {
        return Math.max(...formattedTimeAndPrices.map(i => i.price))
    }

    export function calcDailyMinPrice(formattedTimeAndPrices: FormattedTimeAndPrice[]): number {
        return Math.min(...formattedTimeAndPrices.map(i => i.price))
    }
</script>

<script lang="ts">
    import type {FormattedTimeAndPrice} from "../utils/Types"
    import Bar from "./Bar.svelte";

    export let formattedTimesAndPrices: FormattedTimeAndPrice[]

    $: dailyMax = calcDailyMaxPrice(formattedTimesAndPrices)
    $: dailyMin = calcDailyMinPrice(formattedTimesAndPrices)

    $: yAxisValues = [
        {value: dailyMax, label: `${Math.round(dailyMax)} s/kWh`},
        {value: 0.75 * dailyMax, label: `${Math.round(0.75 * dailyMax)} s/kWh`},
        {value: 0.5 * dailyMax, label: `${Math.round(0.5 * dailyMax)} s/kWh`},
        {value: 0.25 * dailyMax, label: `${Math.round(0.25 * dailyMax)} s/kWh`},
        {value: 0, label: `0 s/kWh`},
        ...(dailyMin < 0 ? [
            { value: 0.25 * dailyMin, label: `${Math.round(0.25 * dailyMin)} s/kWh` },
        ] : [])
    ]
</script>

<div class="chart-container">
    <div class="y-axis-labels">
        {#each yAxisValues as {label}, i}
            <div class="y-axis-line" style="top: {i * 25}%"></div>
            <div class="y-axis-label" style="top: {i * 25}%">{label}</div>
        {/each}
    </div>
    <div class="bar-chart">
        {#each formattedTimesAndPrices as {time, price}}
            <Bar {price} {time} {dailyMax}/>
        {/each}
    </div>
</div>

<style>
    .chart-container {
        position: relative;
        margin-top: 10em;
        width: 80vw;
    }

    .bar-chart {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        box-sizing: border-box;
        height: 40vh;
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