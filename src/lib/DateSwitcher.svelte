<script lang="ts">
    export let date: string
    let currentDate = new Date
    let nextDaySelected = false

    $: currentDate = new Date(date)

    // todo: ei toota
    function isNextDateButtonDisabled() {
        const currentHour = currentDate.getHours()
        return currentHour < 13 || nextDaySelected
    }

    function prevDate() {
        currentDate.setDate(currentDate.getDate() - 1)
        date = currentDate.toISOString().replace(/T.*/, '')
    }

    function nextDate() {
        currentDate.setDate(currentDate.getDate() + 1)
        date = currentDate.toISOString().replace(/T.*/, '')
        nextDaySelected = true
    }
</script>

<div class="date-container">
    <button
            class="prev-button"
            aria-label="Previous"
            on:click={prevDate}>
        <i class="mi mi-chevron-left"></i>
    </button>
    <input class="date-input" type="date" bind:value={date}/>
    <button
            class="next-button {isNextDateButtonDisabled() ? 'disabled' : ''}"
            aria-label="Next"
            on:click={nextDate}
            disabled={isNextDateButtonDisabled()}>
        <i class="mi mi-chevron-right"></i>
    </button>
</div>

<style>
    .date-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1em;
        margin: 2em auto;
    }

    .prev-button, .next-button {
        cursor: pointer;
        padding: 0.55em 0.7em;
        color: #FFF9FA;
        background-color: #664D51;
        border: none;
        border-radius: 7px;
        transition: background-color 0.3s ease;
    }

    .mi {
        font-size: 1.6rem;
        font-weight: 700;
    }

    .prev-button:hover, .next-button:hover, .date-input:hover {
        background-color: #806066;
    }

    .date-input {
        cursor: pointer;
        padding: 0.6em 1em;
        font-size: 1.6em;
        font-weight: 600;
        color: #FFF9FA;
        background-color: #664D51;
        border: none;
        border-radius: 7px;
        transition: background-color 0.3s ease;
    }

    .date-input:focus {
        outline: none;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        background-color: #CC9AA2;
    }

    .disabled {
        background-color: #808080;
        cursor: not-allowed;
    }
</style>