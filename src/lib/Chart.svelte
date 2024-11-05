<script lang="ts">
    import {pricesStore} from "../store/store.js";
    import {derived} from "svelte/store";
    import {onMount} from "svelte";

    type BarData = {
        label: string
        value: number
    }

    let data: BarData[] = []
    let canvas: HTMLCanvasElement

    const selectedCountryData = derived(pricesStore, () => {
            const countryData = $pricesStore.prices[$pricesStore.selectedCountry] || []

            return countryData.map((priceData) => ({
                    label: new Date(priceData.timestamp * 1000).toLocaleDateString(),
                    value: priceData.price
                })
            )
        }
    )

    selectedCountryData.subscribe(() => {
        data = $selectedCountryData
        if (canvas) {
            const contextObject = canvas.getContext('2d')
            if (contextObject) {
                drawChart(contextObject)
            } else {
                console.error('Failed to get 2d context')
            }
        }
    });

    function drawChart(contextObject: CanvasRenderingContext2D) {


        if (!contextObject) return

        const margin = 40;
        const width = canvas.width - margin * 2
        const height = canvas.height - margin * 2
        const maxValue = Math.max(...data.map(d => d.value))

        contextObject.clearRect(0, 0, canvas.width, canvas.height)

        contextObject.beginPath()
        contextObject.moveTo(margin, margin)
        contextObject.lineTo(margin, canvas.height - margin)
        contextObject.lineTo(canvas.width - margin, canvas.height - margin)
        contextObject.strokeStyle = "#000"
        contextObject.stroke()

        const barWidth = width / data.length

        data.forEach((barData, index) => {
            const x = margin + index * barWidth
            const barHeight = (barData.value / maxValue) * height
            const y = canvas.height - margin - barHeight

            contextObject.fillStyle = "#eb94dc"
            contextObject.fillRect(x, y, barWidth - 10, barHeight)

            contextObject.fillStyle = "#f059d7"
            contextObject.fillText(barData.label, x + (barWidth / 2) - 10, canvas.height - margin + 20)

        })
    }

    onMount(() => {
        const contextObject = canvas.getContext('2d');
        if (contextObject) {
            drawChart(contextObject)
        } else {
            console.error('Failed to get 2d context');
        }
    })

</script>

<div>
    <canvas bind:this={canvas} width="600" height="400"></canvas>
</div>

<!--<div>-->
<!--    <h2>{$pricesStore.selectedCountry.toUpperCase()} hinnad:</h2>-->
<!--    {#if $pricesStore.prices[$pricesStore.selectedCountry]}-->
<!--        <ul>-->
<!--            {#each $pricesStore.prices[$pricesStore.selectedCountry] as priceData}-->
<!--                <li>-->
<!--                    <p>Aeg: {new Date(priceData.timestamp * 1000).toString()}</p>-->
<!--                    <p>Hind: {priceData.price} EUR</p>-->
<!--                </li>-->
<!--            {/each}-->
<!--        </ul>-->
<!--    {/if}-->
<!--</div>-->