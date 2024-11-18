<script lang="ts">
    import type {Device, Devices} from "../utils/Types"
    import devices from "../assets/devices.json"

    export let selectedDeviceCode: Devices

    let typedDevices: Devices = devices
    let device: Device | undefined

    $: device = selectedDeviceCode ? typedDevices[selectedDeviceCode] : undefined
console.log(device)
    // let totalCost: number = 0



</script>

<div>
    <p>
        Selle seadme voimsusega {device?.watts} vatti laadimine/kasutamine {device?.hours} tundi maksab Sulle (eur)eurot.
    </p>
</div>