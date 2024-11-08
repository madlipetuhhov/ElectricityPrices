<script lang="ts">
    import type {EleringPrices} from "../utils/types";

    export let date: string
    export let countryCode: string
    export let prices: { timestamp: number, price: number }[] = []

    let allPrices: EleringPrices = {}

    // todo: teha ts failiks, et ei oleks Svelte component
    // todo: peaks olema allPrices-iks ka mapitud, sobivam andme struktuur (vist ongi country code)
    export function getFetchUrl(date: string, countryCode: string) {
        const startTime = new Date(date + 'T00:00').toISOString();
        const endTime = new Date(date + 'T23:59').toISOString();
        return `/api/nps/price?start=${startTime}&end=${endTime}&country=${countryCode}`;
    }

    export async function fetchData(date: string) {
        try {
            const response = await fetch(getFetchUrl(date, countryCode));
            if (!response.ok) {
                throw new Error('Failed to fetch data')
            }
            const responseData = await response.json()
            if (responseData.success) {
                allPrices = responseData.data
                console.log(allPrices)
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
