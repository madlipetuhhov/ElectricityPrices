<script lang="ts">
    import type {DayPricesCentsPerKWh, Device, Devices} from "../utils/Types"
    import devices from "../assets/devices.json"
    import {calcChargingCost} from "../utils/DeviceEnergyPriceCalc";

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

<div>
    <p>
        Selle seadme voimsusega {device?.watts} vatti laadimine/kasutamine {device?.hours} tundi maksab Sulle {totalCost} eurot.
    </p>
</div>