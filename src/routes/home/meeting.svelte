<script>
    import QrCode from '$components/QRCode.svelte';
    import { start_hydrating } from 'svelte/internal';

    var timeLeft;
    var timerId;
    let meetingStarted = false;
    let qrShown = false;
    let statisticsArr = [{ start_time: '12:00', count: '3' }];

    function meetStatus() {
        meetingStarted = !meetingStarted;
        qrShown = false;
    }

    function showHeadcount() {
        qrShown = !qrShown;
        if (qrShown) {
            timeLeft = 60;
            timerId = setInterval(countdown, 1000);
        }
    }

    function countdown() {
        if (timeLeft == 0) {
            qrShown = false;
            clearTimeout(timerId);
        } else {
            timeLeft--;
        }
    }
</script>

<svelte:head>
    <html lang="en-GB" />
    <title>Meeting page</title>
    <meta name="description" content="The page where professors can start and manage a meeting" />
    <meta name="robots" content="noindex" />
</svelte:head>

<div class="flex flex-row py-4 px-4">
    {#if !meetingStarted}
        <button id="meetingStart" class="btn text-neutral-content" on:click={meetStatus}>Start meeting</button>
    {:else}
        <div class="flex flex-col">
            {#if !qrShown}
                <button id="headCount" class="btn text-neutral-content mb-5" on:click={showHeadcount}>Headcount</button>
            {:else}
                {#if timeLeft == 1}
                    <p class="mb-5">{timeLeft} second remaining</p>
                {:else}
                    <p class="mb-5">{timeLeft} seconds remaining</p>
                {/if}
                <div id="qrcode" class="w-64 h-64 mb-5">
                    <QrCode text="https://daisyui.com/" size="128" />
                </div>
            {/if}
            {#each statisticsArr as stats, index}
                <p class="pb-2">Stats: {stats.start_time} {stats.count} {index + 1}</p>
            {/each}
            <button id="meetingClose" class="btn text-neutral-content" on:click={meetStatus}>Stop meeting</button>
        </div>
    {/if}
</div>
