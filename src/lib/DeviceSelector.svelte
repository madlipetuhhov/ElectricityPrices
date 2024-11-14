<script lang="ts">
    import {t} from "../i18n/Language";
    import {type Device, devices} from "../utils/Types";

    const deviceCodes = Object.keys(devices) as Device []
    let deviceCode = deviceCodes[0]
</script>
<!--todo: default kuvab "vali seade"-->

<div class="device-container">
    <select class="device-select" bind:value={deviceCode}>
        {#each deviceCodes as deviceCode}
            <option value={deviceCode}>{t.devices[deviceCode]}</option>
        {/each}
    </select>
</div>

<style>
    .device-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .device-select {
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

    .device-select:hover {
        background-color: #806066;
    }

    .device-select:focus {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
</style>