<script lang="ts">
    import type {DayPricesCentsPerKWh, Device, Devices} from "../utils/Types"
    import devices from "../assets/devices.json"
    import {calcChargingCost} from "../utils/DeviceEnergyPriceCalc";
    import {t} from "../i18n/Language";

    export let selectedDeviceCode: string
    export let dayPricesForCountry: DayPricesCentsPerKWh = []

    let typedDevices: Devices = devices
    let device: Device | undefined
    let totalCost: number

    $: device = selectedDeviceCode ? typedDevices[selectedDeviceCode] : undefined

    $: {
        if (device && dayPricesForCountry.length > 0) {
            totalCost = calcChargingCost(device, dayPricesForCountry)
        }
    }

</script>

<div class="device-info-container">
    {#if selectedDeviceCode}
        <p>{t.power_consumption}:&nbsp;{device?.watts}&nbsp;{t.units.watts}</p>
        <p>{t.usage_time}:&nbsp;{device?.hours}&nbsp;{t.units.hour}</p>
        <p>{t.cost}:&nbsp;{totalCost.toFixed(2)}&nbsp;{t.units.euro}</p>
    {:else}
        <p>{t.load_cost}</p>
    {/if}
</div>

<style>
    .device-info-container {
        font-size: 1.2em;
        font-weight: 600;
    }
</style>