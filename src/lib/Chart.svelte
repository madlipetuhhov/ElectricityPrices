<script lang="ts" module>
    export function calcDailyMaxPrice(dayPricesForCountry: DayPricesCentsPerKWh): number{
        return Math.max(...dayPricesForCountry)
    }

    export function calcDailyMinPrice(dayPricesForCountry: DayPricesCentsPerKWh): number {
        return Math.min(...dayPricesForCountry)
    }
</script>

<script lang="ts">
    import Bar from "./Bar.svelte";
    import {t} from "../i18n/Language";
    import type {DayPricesCentsPerKWh} from "../utils/Types";

    export let dayPricesForCountry: DayPricesCentsPerKWh = []

    $: dailyMax = calcDailyMaxPrice(dayPricesForCountry)
    $: dailyMin = calcDailyMinPrice(dayPricesForCountry)

    $: yAxisValues = [
        {value: dailyMax, label: `${Math.round(dailyMax)} ${t.units.cent}/${t.units.kWh}`},
        {value: 0.75 * dailyMax, label: `${Math.round(0.75 * dailyMax)} ${t.units.cent}/${t.units.kWh}`},
        {value: 0.5 * dailyMax, label: `${Math.round(0.5 * dailyMax)} ${t.units.cent}/${t.units.kWh}`},
        {value: 0.25 * dailyMax, label: `${Math.round(0.25 * dailyMax)} ${t.units.cent}/${t.units.kWh}`},
        {value: 0, label: `0 ${t.units.cent}/${t.units.kWh}`},
        ...(dailyMin < 0 ? [
            {value: 0.25 * dailyMin, label: `${Math.round(0.25 * dailyMin)} ${t.units.cent}/${t.units.kWh}`},
        ] : [])
    ]
</script>

<div class="chart-container">
    <div class="y-axis-container">
        {#each yAxisValues as {label}, i}
            <div class="y-line" style="top: {i * 25}%"></div>
            <div class="y-label" style="top: {i * 25}%">{label}</div>
        {/each}
    </div>
    <div class="bar-chart">
        {#each dayPricesForCountry as dayPrice, hour}
            <Bar {dayPrice} {hour} {dailyMax}/>
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
        height: 40vh;
    }

    .y-axis-container {
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

    .y-line {
        position: absolute;
        left: 0;
        width: 100%;
        height: 0;
        border-top: 0.1em dotted #B3868E;
    }

    .y-label {
        position: absolute;
        left: -5em;
        transform: translateY(-50%);
        width: 100%;
        text-align: left;
    }
</style>