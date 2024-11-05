<script lang="ts">
    import {pricesStore} from "../store/store.js";
</script>

<div>
    <h2>{$pricesStore.selectedCountry.toUpperCase()} hinnad:</h2>
    {#if $pricesStore.prices[$pricesStore.selectedCountry]}
        <ul>
            {#each $pricesStore.prices[$pricesStore.selectedCountry] as priceData}
                <li>
                    <p>Aeg: {new Date(priceData.timestamp * 1000).toString()}</p>
                    <p>Hind: {priceData.price} EUR</p>
                </li>
            {/each}
        </ul>
    {/if}
</div>