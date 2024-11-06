<!--<script lang="ts">-->
<!--    import {onMount} from "svelte";-->

<!--    export let prices: Record<string, any> = {}-->

<!--    type BarData = {-->
<!--        label: string-->
<!--        value: number-->
<!--    }-->

<!--    let data: BarData[] = []-->
<!--    let canvas: HTMLCanvasElement-->

<!--    $: if (prices) {-->
<!--        formatData();-->
<!--    }-->

<!--    function formatData() {-->
<!--        const countryData = prices || []-->
<!--        data = countryData.map((priceData: {timestamp: number; price: number}) => ({-->
<!--                label: new Date(priceData.timestamp * 1000).toLocaleDateString(),-->
<!--                value: priceData.price-->
<!--            })-->
<!--        )-->
<!--    }-->

<!--    // const selectedCountryData = derived(pricesStore, () => {-->
<!--    //         const countryData = $pricesStore.prices[$pricesStore.selectedCountry] || []-->
<!--    //-->
<!--    //         return countryData.map((priceData) => ({-->
<!--    //                 label: new Date(priceData.timestamp * 1000).toLocaleDateString(),-->
<!--    //                 value: priceData.price-->
<!--    //             })-->
<!--    //         )-->
<!--    //     }-->
<!--    // )-->
<!--    //-->
<!--    // selectedCountryData.subscribe(() => {-->
<!--    //     data = $selectedCountryData-->
<!--    //     if (canvas) {-->
<!--    //         const contextObject = canvas.getContext('2d')-->
<!--    //         if (contextObject) {-->
<!--    //             drawChart(contextObject)-->
<!--    //         } else {-->
<!--    //             console.error('Failed to get 2d context')-->
<!--    //         }-->
<!--    //     }-->
<!--    // });-->

<!--    function drawChart(contextObject: CanvasRenderingContext2D) {-->


<!--        if (!contextObject) return-->

<!--        const margin = 40;-->
<!--        const width = canvas.width - margin * 2-->
<!--        const height = canvas.height - margin * 2-->
<!--        const maxValue = Math.max(...data.map(d => d.value))-->

<!--        contextObject.clearRect(0, 0, canvas.width, canvas.height)-->

<!--        contextObject.beginPath()-->
<!--        contextObject.moveTo(margin, margin)-->
<!--        contextObject.lineTo(margin, canvas.height - margin)-->
<!--        contextObject.lineTo(canvas.width - margin, canvas.height - margin)-->
<!--        contextObject.strokeStyle = "#000"-->
<!--        contextObject.stroke()-->

<!--        const barWidth = width / data.length-->

<!--        data.forEach((barData, index) => {-->
<!--            const x = margin + index * barWidth-->
<!--            const barHeight = (barData.value / maxValue) * height-->
<!--            const y = canvas.height - margin - barHeight-->

<!--            contextObject.fillStyle = "#eb94dc"-->
<!--            contextObject.fillRect(x, y, barWidth - 10, barHeight)-->

<!--            contextObject.fillStyle = "#f059d7"-->
<!--            contextObject.fillText(barData.label, x + (barWidth / 2) - 10, canvas.height - margin + 20)-->

<!--        })-->
<!--    }-->

<!--    onMount(() => {-->
<!--        const contextObject = canvas.getContext('2d');-->
<!--        if (contextObject) {-->
<!--            drawChart(contextObject)-->
<!--        } else {-->
<!--            console.error('Failed to get 2d context');-->
<!--        }-->
<!--    })-->

<!--</script>-->

<!--<div>-->
<!--    <canvas bind:this={canvas} width="600" height="400"></canvas>-->
<!--</div>-->

<!--&lt;!&ndash;<div>&ndash;&gt;-->
<!--&lt;!&ndash;    <h2>{$pricesStore.selectedCountry.toUpperCase()} hinnad:</h2>&ndash;&gt;-->
<!--&lt;!&ndash;    {#if $pricesStore.prices[$pricesStore.selectedCountry]}&ndash;&gt;-->
<!--&lt;!&ndash;        <ul>&ndash;&gt;-->
<!--&lt;!&ndash;            {#each $pricesStore.prices[$pricesStore.selectedCountry] as priceData}&ndash;&gt;-->
<!--&lt;!&ndash;                <li>&ndash;&gt;-->
<!--&lt;!&ndash;                    <p>Aeg: {new Date(priceData.timestamp * 1000).toString()}</p>&ndash;&gt;-->
<!--&lt;!&ndash;                    <p>Hind: {priceData.price} EUR</p>&ndash;&gt;-->
<!--&lt;!&ndash;                </li>&ndash;&gt;-->
<!--&lt;!&ndash;            {/each}&ndash;&gt;-->
<!--&lt;!&ndash;        </ul>&ndash;&gt;-->
<!--&lt;!&ndash;    {/if}&ndash;&gt;-->
<!--&lt;!&ndash;</div>&ndash;&gt;-->