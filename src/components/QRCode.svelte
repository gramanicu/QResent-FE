<script>
    import QRCode from 'easyqrcodejs';
    import { onMount } from 'svelte';

    export let text;

    let wrapper;

    onMount(() => {
        const options = {
            text: text,
            quietZone: 0,
            colorDark: 'rgba(1, 50, 67, 1)',
            colorLight: 'rgba(255, 248, 220, 1)',
            correctLevel: QRCode.CorrectLevel.H,
            dotScale: 0.6,
            dotScaleTiming: 1,
            tooltip: true,
        };
        new QRCode(wrapper, options);
    });
</script>

<div class="qrcode-wrapper" bind:this={wrapper} />

<style lang="scss">
    .qrcode-wrapper {
        width: 100%;
        position: relative;
        padding: 50%;
        z-index: 1;

        :global(canvas) {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }
    }
</style>
