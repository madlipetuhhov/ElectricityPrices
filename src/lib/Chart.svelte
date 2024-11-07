<script lang="ts">
    export let formattedTimeAndPrice: { time: string, price: number }[] = []
    let minPrice = Math.min(...formattedTimeAndPrice.map(data => data.price));
    let maxPrice = Math.max(...formattedTimeAndPrice.map(data => data.price));

    let yAxisStep = (maxPrice - minPrice) / 5;
    let yAxisLabels = [];
    for (let i = 0; i <= 5; i++) {
        yAxisLabels.push(minPrice + i * yAxisStep);
    }

</script>
<!--todo: negatiivsed hinnad-->

<main>
    <div class="chart-wrapper">
        <div class="y-axis-label">Hind (s/kWh)</div>
        <div class="y-axis">
            {#each yAxisLabels as label, index}
                <div class="y-axis-data">{label.toFixed(2)}</div>
            {/each}
        </div>
        <div class="chart-container">
            {#each formattedTimeAndPrice as {time, price}}
                <div class="bar" style="height: {price}em;">
                    <div class="bar-price">{price} s/kWh</div>
                    <div class="bar-label">{time}</div>
                </div>
            {/each}
        </div>
<!--        <div class="x-axis-label">Tunnid</div>-->
    </div>
</main>

<style>


    .chart-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
        border-left: 0.2em solid #664D51;
        border-bottom: 0.2em solid #664D51;
        box-sizing: border-box;
    }

    .bar {
        width: 4.5em;
        background-color: 	#E6ADB7;
        text-align: center;
        position: relative;
        margin: 0.5em 0.5em 0 0.5em;
        border-top-left-radius: 0.7em;
        border-top-right-radius: 0.7em;
        transition: background-color 0.3s ease, height 0.3s ease;

    }

    .bar:hover {
        background-color: #CC9AA2;
        height: 10em;
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
        text-align: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        background-color: #664D51;
        color: #FFF9FA;
        padding: 0.5em 0.8em;
        border-radius: 0.7em;
    }

    .bar:hover .bar-price {
        opacity: 1;
    }

    .chart-wrapper {
        position: relative;
        margin-top: 6em;
    }

    .y-axis-label {
        position: absolute;
        left: 0;
        top: -10%;
        transform: translateY(-50%);
        font-size: 1.3em;
        font-weight: 600;
        color: #FFF9FA;
        text-align: center;
        background-color: #664D51;
        padding: 0.5em 0.8em;
        border-radius: 0.7em;
    }

</style>