<script lang="ts">
    export let options: { value: string; label: string }[] = []
    export let value: string
</script>

<div>
    <select bind:value={value}>
        {#each options as {value, label}}
            <option value={value}>{label}</option>
        {/each}
    </select>
</div>

<style>
    select {
        cursor: pointer;
        padding: 0.4em 0.7em;
        font-size: 1.6em;
        font-weight: 600;
        color: #FFF9FA;
        background-color: #664D51;
        border: none;
        border-radius: 7px;
        outline: none;
    }

    select:hover {
        background-color: #806066;
    }

    select:focus {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
</style>