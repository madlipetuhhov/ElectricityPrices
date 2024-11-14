<script lang="ts">
    import type {ISODate} from "../utils/Types";

    export let date: ISODate
    let nextDaySelected = false

    // todo: disabled button
    // The DayAhead prices are available around 13:00 CET/CEST.
    function isNextDateButtonDisabled(): boolean {
        const today = new Date()
        const tomorrow = new Date()

        // kas valitud on tomorrow  -yes, disable.
        // kell on tana vahem 13:00
        // kell 10:00 hommikul (disabled): kell < 13 && date == tomorrow
        // kell 14:00: ei ole disabled
        tomorrow.setDate(today.getDate() + 1)
        // console.log('homme ' + tomorrow.toISOString().split('T')[0] as ISODate, 'kasutaja valitud '+ date)
        return nextDaySelected
    }

    function prevDate() {
        const newDate = new Date(date)
        // console.log('prevDate new date ' + newDate)
        newDate.setDate(newDate.getDate() - 1)
        date = newDate.toISOString().replace(/T.*/, '') as ISODate
    }

    function nextDate() {
        const newDate = new Date(date)
        // console.log('nextDate new date ' + newDate)
        newDate.setDate(newDate.getDate() + 1)
        date = newDate.toISOString().replace(/T.*/, '') as ISODate

    }
</script>

<div class="date-container">
    <button
            class="btn-prev"
            aria-label="Previous"
            on:click={prevDate}>
        <i class="mi mi-chevron-left"></i>
    </button>
    <input class="date-input" type="date" bind:value={date}/>
    <button
            class="btn-next"
            aria-label="Next"
            on:click={nextDate}
            class:disabled={isNextDateButtonDisabled()}
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

    .btn-prev, .btn-next {
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

    .btn-prev:hover, .btn-next:hover, .date-input:hover {
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