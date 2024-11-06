<script lang="ts">
    import DataMapper from "./DataMapper.svelte";

    export let formattedTimeAndPrice: { time: string, price: number }[] = []

</script>

<div>

</div>

<style>
    .chart-container {
        width: 100%;
        height: 300px;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        border-left: 2px solid #000;
        border-bottom: 2px solid #000;
        padding: 10px;
    }

    .bar {
        width: 30px;
        background-color: #3498db;
        display: inline-block;
        margin: 0 10px;
        transition: all 0.3s ease-in-out;
    }

    /* Optional: Add hover effect */
    .bar:hover {
        background-color: #2980b9;
    }

    .label {
        text-align: center;
        margin-top: 5px;
        font-size: 12px;
    }
</style>