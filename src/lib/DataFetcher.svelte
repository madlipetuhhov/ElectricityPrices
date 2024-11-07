<script lang="ts">
    export let date: string
    export let countryCode: string
    export let prices: { timestamp: number, price: number }[] = []

    let allPrices: { [country: string]: { timestamp: number, price: number }[] } = {}

    function adjustStartTimezoneForAPI(date: string): string {
        return new Date(new Date(date).setHours(0, 0, 0, 0)).toISOString();
    }

    async function fetchData(date: string) {

        try {
            const startTime = adjustStartTimezoneForAPI(date)
            const response = await fetch(`https://dashboard.elering.ee/api/nps/price?start=${startTime}&end=${date}T23:59:59.999Z`);
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
