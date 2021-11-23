<script>
    import QrCode from '$components/QRCode.svelte';
    import { callBackend, roleFromEnum } from '$lib/backend';
    import { goto } from '$app/navigation';
    import { role } from '$stores/authentication';
    import { onDestroy, onMount } from 'svelte';

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

        try {
            const res = await callBackend('/subject/get-all', 'GET');
            res.forEach(cls => {
                classes = [...classes, { ...cls }];
            });
        } catch (err) {
            console.error(err);
        }
    });

    onDestroy(async () => {
        if (meetingStarted) {
            await stopMeeting();
        }
    });

    let classes = [];
    let headcounts = [];

    let timeLeft;
    let timerId;
    let meetingStarted = false;
    let qrShown = false;
    let qr_url = '';
    let meet_id;
    let qr_gen_time = null;

    async function startMeeting(class_id) {
        try {
            const startTime = new Date();
            const res = await callBackend('/meeting/add', 'POST', {
                startTime: startTime.toISOString(),
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

            meetStatus();
        } catch (err) {
            console.error(err);
        }
    }

    async function refreshStatistics() {
        try {
            let new_hc = [];
            const res_headcounts = await callBackend(`/meeting/get-all-headcounts/${meet_id}`, 'GET');

            for (const hc of res_headcounts) {
                const students = await callBackend(`/headcount/get-students-by-headcountid/${hc.token}`, 'GET');

                let users = [];

                for (const stud of students) {
                    users = [
                        ...users,
                        {
                            username: stud.appUser.username,
                            firstName: stud.appUser.firstName,
                            lastName: stud.appUser.lastName,
                            email: stud.appUser.email,
                        },
                    ];
                }

                new_hc = [
                    ...new_hc,
                    {
                        time: qr_gen_time,
                        users: users,
                        verified: users.length,
                    },
                ];
            }

            headcounts = new_hc;
        } catch (err) {
            console.log(err);
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
            qr_gen_time = expire;
            const res = await callBackend(`/headcount/add`, 'POST', {
                token: qr_token,
                expiresAt: expire.toISOString(),
                meeting: {
                    id: meet_id,
                },
            });
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

            refreshStatistics();
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
            {#each headcounts as hc, index}
                <p class="pb-2">
                    Headcount #{index + 1} ({hc.time.toLocaleTimeString()}) stats: {hc.verified} students present
                </p>
            {/each}
            <button id="meetingClose" class="btn text-neutral-content" on:click={stopMeeting}>Stop meeting</button>
        </div>
    {/if}
</div>
