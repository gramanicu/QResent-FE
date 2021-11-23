<script>
    import QrCode from '$components/QRCode.svelte';
    import { callBackend, roleFromEnum } from '$lib/backend';
    import { goto } from '$app/navigation';
    import { role } from '$stores/authentication';
    import { onMount } from 'svelte';

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    onMount(async () => {
        let userRole = roleFromEnum($role);
        if (!(userRole == 1)) {
            goto('/home');
            return;
        }

        const res = await callBackend('/subject/get-all', 'GET');
        res.forEach(cls => {
            classes = [...classes, { ...cls }];
        });
    });

    let classes = [];

    let timeLeft;
    let timerId;
    let meetingStarted = false;
    let qrShown = false;
    let qr_url = '';
    let statisticsArr = [{ start_time: '12:00', count: '3' }];
    let meet_id;

    async function startMeeting(class_id) {
        try {
            const res = await callBackend('/meeting/add', 'POST', {
                startTime: new Date().toISOString(),
                subject: classes.find(cls => cls.id == class_id),
            });

            meet_id = res.id;
            meetStatus();
        } catch (err) {
            console.error(err);
        }
    }

    async function stopMeeting() {
        try {
            const res = await callBackend(`/meeting/update/${meet_id}`, 'PUT', {
                endTime: new Date().toISOString(),
            });

            console.log(res);
            meetStatus();
        } catch (err) {
            console.error(err);
        }
    }

    function meetStatus() {
        meetingStarted = !meetingStarted;
        qrShown = false;
    }

    async function showHeadcount() {
        let qr_token = makeid(32);
        qr_url = `${window.location.protocol}//${window.location.host}/home/qr/${qr_token}`;
        let expire = new Date();
        expire = new Date(expire.getTime() + 1000 * 60);

        try {
            const res = await callBackend(`/headcount/add`, 'POST', {
                token: qr_token,
                expiresAt: expire.toISOString(),
                meeting: {
                    id: meet_id,
                },
            });

            console.log(res);
        } catch (err) {
            console.error(err);
            return;
        }

        console.log(qr_url);
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
        <div class="flex flex-col">
            {#each classes as cls}
                <div class="flex flex-row mb-2">
                    <h1 class="mr-4">Subject: {cls.name}</h1>
                    <button
                        id="meetingStart"
                        class="btn btn-xs text-neutral-content"
                        on:click={() => startMeeting(cls.id)}>Start meeting</button>
                </div>
            {/each}
        </div>
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
                    <QrCode text={qr_url} />
                </div>
            {/if}
            {#each statisticsArr as stats, index}
                <p class="pb-2">Stats: {stats.start_time} {stats.count} {index + 1}</p>
            {/each}
            <button id="meetingClose" class="btn text-neutral-content" on:click={stopMeeting}>Stop meeting</button>
        </div>
    {/if}
</div>
