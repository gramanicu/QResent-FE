<script>
</script>

<svelte:head>
    <html lang="en-GB" />
    <title>QResent</title>
    <meta name="description" content="QResent is a tool used to check online classes attendance" />
</svelte:head>

<div class="hero min-h-screen bg-color">
    <div class="hero-overlay bg-opacity-60" />
    <div class="text-center hero-content text-neutral-content">
        <div class="max-w-md">
            <h1 class="mb-5 text-5xl font-bold">QResent</h1>
            <p class="mb-5">QResent is a tool used to check online classes attendance</p>
            <div class="flex flex-row items-center justify-center">
                <a href="/auth/signin" class="btn btn-primary btn-config text-neutral-content">Login</a>
                <a href="/auth/signup" class="btn btn-primary btn-config text-neutral-content">Signup</a>
            </div>
        </div>
    </div>
</div>

<style>
    .btn-config {
        margin-left: 10px;
        margin-right: 10px;
    }

    .bg-color {
        background: #ffffff;
        background: linear-gradient(135deg, hsla(var(--n)) -10%, hsla(var(--p)) 70%, hsla(var(--pf)) 105%);
    }
</style>
