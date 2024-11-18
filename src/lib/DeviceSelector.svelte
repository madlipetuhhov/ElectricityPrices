<script lang="ts">
    import {t} from "../i18n/Language"
    import devices from "../assets/devices.json"
    import type {Devices} from "../utils/Types"

    export let selectedDeviceCode: string

    const typedDevices: Devices = devices
    let deviceCodes: string[] = Object.keys(typedDevices)

</script>

<div class="device-select-container">
    <select class="device-select" bind:value={selectedDeviceCode}>
        <option class="default-option" value="" disabled selected>{t.deviceMenu}</option>
        {#each deviceCodes as deviceCode}
            <option class="device-option" value={deviceCode}>{t.devices[deviceCode]}</option>
        {/each}
    </select>
</div>

<style>
    .device-select-container {
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