<script lang="ts">
    import {t} from "../i18n/Language";
    import devices from "../assets/devices.json"
    import type {Devices} from "../utils/Types";

    const typedDevices: Devices = devices
    export let deviceCodes: string[] = Object.keys(typedDevices)

    let deviceCode: string = ''
    let powerInKW: number = 0
    let priceInCKWh: number = 0

    $: console.log(deviceCode)
</script>

<div class="device-container">
    <select class="device-select" bind:value={deviceCode}>
        <option class="default-option" value="" disabled selected>{t.deviceMenu}</option>
        {#each deviceCodes as deviceCode}
            <option class="device-option" value={deviceCode}>{t.devices[deviceCode]}</option>
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