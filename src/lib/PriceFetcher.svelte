<script lang="ts">

    import {onMount} from "svelte";
    import {pricesStore} from "../store/store.js";

    async function fetchPrices() {
        try {
            // todo: url muutmine nii et kuupaev, kellaaeg muutuks
            const response = await fetch('https://dashboard.elering.ee/api/nps/price?start=2024-11-03T22:00:00.000Z&end=2024-11-04T21:59:59.999Z');
            if (!response.ok) {
                throw new Error('Failed to fetch data')
            }
            const responseData = await response.json()
            if (responseData.success) {
                pricesStore.update(state => ({
                    ...state,
                    prices: responseData.data
                }));
            } else {
                console.error('API returned an unsuccessful response')
            }

        } catch (err) {
            console.error('Error fetching data:', err)
        }

    }

    onMount(fetchPrices)
</script>