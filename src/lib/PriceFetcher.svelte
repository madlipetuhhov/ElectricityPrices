<script lang="ts">

    export let date: string
    export let countryCode: string
    export let prices: { timestamp: number; price: number }[] = []

    interface PriceData {
        timestamp: number
        price: number
    }

    let allPrices: Record<string, PriceData[]> = {}

    async function fetchPrices(date: string) {
        try {
            const response = await fetch(`https://dashboard.elering.ee/api/nps/price?start=${date}T00:00:00.000Z&end=${date}T23:59:59.999Z`);
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

    $: fetchPrices(date)
    $: prices = allPrices[countryCode]
</script>