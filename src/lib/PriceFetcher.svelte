<script lang="ts">

    import {onMount} from "svelte";

    interface PriceData {
        timestamp: number
        price: number
    }

    type CountryCode = 'ee'|'lv'|'lt'|'fi'

    interface CountryData {
        [countryCode: string]: PriceData[]
    }

    interface Response {
        success: boolean
        data: CountryData
    }

    let data: Record<CountryCode, Array<PriceData>> = {}
    let localPrices: PriceData[] = []
    let error: string | undefined

    onMount(async () => {
        try {
            const response = await fetch('https://dashboard.elering.ee/api/nps/price?start=2024-11-03T22:00:00.000Z&end=2024-11-04T21:59:59.999Z');
            if (!response.ok) {
                throw new Error('Not a successful fetch!')
            }
          const data: Response = await response.json()
            if (data.success) {
                localPrices = data.data['ee']
            } else {
                throw new Error('Not a successful fetch!')
            }

        } catch (err) {
            error = err instanceof Error ? err.message : 'Not a successful fetch!'
        }

    });
</script>

<div>
    {#if error}
        <p>Error: {error}</p>
    {:else if localPrices.length === 0}
        <p>Hindu pole saadaval.</p>
    {:else}
        <h2>{countryCode.toUpperCase()} hinnad:</h2>
        <ul>
            {#each localPrices as priceData}
                <li>
                    Aeg: {new Date(priceData.timestamp * 1000).toLocaleDateString()} - Hind: {priceData.price} EUR
                </li>
            {/each}
        </ul>
    {/if}
</div>