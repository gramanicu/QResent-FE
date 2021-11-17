<script>
    import QrCode from '$components/QRCode.svelte';
</script>

<svelte:head>
    <html lang="en-GB" />
    <title>QResent Home</title>
    <meta name="description" content="The QResent user homepage" />
    <meta name="robots" content="noindex" />
</svelte:head>

<div class="w-64 h-64">
    <QrCode text="https://daisyui.com/" size="128" />
</div>

<style>
</style>
