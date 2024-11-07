<script lang="ts">
    import type {EleringPrices} from "./types";

    export let date: string
    export let countryCode: string
    export let prices: { timestamp: number, price: number }[] = []

    let allPrices: EleringPrices = {}

    async function fetchData(date: string) {
        try {
            const startTime = new Date(date + 'T00:00').toISOString();
            const endTime = new Date(date + 'T23:59').toISOString();
            const response = await fetch(`https://dashboard.elering.ee/api/nps/price?start=${startTime}&end=${endTime}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data')
            }
            const responseData = await response.json()
            if (responseData.success) {
                allPrices = responseData.data
            } else {
                console.error('API returned an unsuccessful response')
            }

        } catch (err) {
            console.error('Error fetching data:', err)
        }
    }

    $: fetchData(date)
    $: prices = allPrices[countryCode]
</script>

<svelte:options accessors/>
