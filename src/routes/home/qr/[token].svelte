<script>
    import { page } from '$app/stores';
    import { callBackend, roleFromEnum } from '$lib/backend';
    import { goto } from '$app/navigation';
    import { backUrl, role } from '$stores/authentication';
    import { onMount } from 'svelte';

    let verified = 1;
    let verification = null;

    onMount(async () => {
        let userRole = roleFromEnum($role);
        if (!(userRole == 2)) {
            $backUrl = window.location.pathname;
            goto('/home');
            return;
        }

        try {
            const res = await callBackend('/headcount/scan-qr', 'POST', {
                token: $page.params.token,
            });

            verified = 2;
        } catch (err) {
            verified = 0;
        }

        try {
            const res = await callBackend(`/headcount/get/${$page.params.token}`, 'GET');
            verification = res;
            verification.meeting.startTime = new Date(verification.meeting.startTime);
            console.log(verification);
        } catch (err) {
            console.error(err);
        }
    });
</script>

{#if verified == 0}
    <div class="card bg-neutral-content shadow-lg rounded-xl flex flex-col max-w-sm mx-4  mt-4">
        <div class="card-body">
            <h1 class="my-4 text-4xl font-bold card-title text-error">Invalid QR Code</h1>
            <h2 class="card-title">The QR code may be expired</h2>
        </div>
    </div>
{:else if verified == 1}
    <div class="card bg-neutral-content shadow-lg rounded-lg flex flex-col max-w-sm mx-4  mt-4">
        <div class="card-body">
            <h1 class="my-4 text-4xl font-bold card-title">Verifiying the QR code</h1>
        </div>
    </div>
{:else}
    <div class="card bg-neutral-content shadow-lg rounded-lg flex flex-col max-w-sm mx-4  mt-4">
        <div class="card-body">
            <h1 class="my-4 text-4xl font-bold card-title text-success">QR was validated</h1>
            {#if verification}
                <h2 class="card-title">Subject: {verification.meeting.subject.name}</h2>
                <h2>Meeting started at {verification.meeting.startTime.toLocaleTimeString()}</h2>
            {/if}
        </div>
    </div>
{/if}
