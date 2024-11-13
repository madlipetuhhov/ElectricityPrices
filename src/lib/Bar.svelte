<script lang="ts">
    export let price: number
    export let time: string
    export let dailyMax: number
</script>

<!--todo: tests and data formatting here (smaller window only hour seen)-->

<div class="bar-container">
    <div class="bar negative"
         class:negative={price < 0}
         style="height: {Math.abs(price / dailyMax * 100)}%">
        <div class="label">{price} s/kWh</div>
    </div>
    <div class="hour">{time}</div>
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
        background-color: #CC9AA2;
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