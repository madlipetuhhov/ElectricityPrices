<script lang="ts">
    import {t} from "../i18n/Language"

    export let dayPrice: number
    export let hour: number
    export let dailyMax: number

    function isCurrentHour() {
        const today = new Date()
        const currentHour = today.getHours()
        return hour === currentHour && today.getDate() === new Date().getDate()
    }

    $: isCurrent = isCurrentHour()

</script>

<div class="bar-container">
    <div class="bar negative"
         class:negative={dayPrice < 0}
         class:current={isCurrent}
         style="height: {Math.abs(dayPrice / dailyMax * 100)}%">
        <div class="label">{dayPrice} {`${t.units.cent}/${t.units.kWh}`}</div>
    </div>
    <div class="hour">{hour}</div>
</div>

<style>
    .bar-container {
        height: 100%;
        width: 2.5%;
        position: relative;
        font-size: 1.2em;
        font-weight: 600;
    }

    .bar {
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: #E6ADB7;
        border-radius: 7px 7px 0 0;
        transition: background-color 0.3s ease;
    }

    .bar.negative .label {
        transform-origin: top;
        transform: translateX(-50%) scaleY(-1);
        top: calc(100% + 4em);
    }

    .bar:hover {
        background-color: #B88A92;
    }

    .bar.current {
        background-color: #B88A92;
    }

    .bar.current .label {
        opacity: 1;
    }

    .negative {
        transform-origin: bottom;
        transform: scaleY(-1);
    }

    .label {
        position: absolute;
        top: -4em;
        left: 50%;
        transform: translateX(-50%);
        line-height: 1.2;
        text-align: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        background-color: #664D51;
        color: #FFF9FA;
        padding: 0.4em 0.7em;
        border-radius: 7px;
        box-shadow: 0 0 7px rgba(0, 0, 0, 0.3);
        z-index: 10;
    }

    .bar-container:hover .label {
        opacity: 1;
    }

    .hour {
        position: absolute;
        bottom: -2em;
        width: 100%;
        text-align: center;
    }
</style>