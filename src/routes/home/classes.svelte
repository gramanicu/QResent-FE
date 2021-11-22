<script>
    import { callBackend, roleFromEnum } from '$lib/backend';
    import { goto } from '$app/navigation';
    import { role } from '$stores/authentication';
    import { onMount } from 'svelte';

    onMount(async () => {
        let userRole = roleFromEnum($role);

        if (!(userRole == 1 || userRole == 2)) {
            console.log(`asdasd ${userRole}`);
            goto('/home');
            return;
        }

        const res = await callBackend('/subject/get-all', 'GET');
        res.forEach(cls => {
            classes = [...classes, { ...cls }];
        });
    });

    let classes = [];
</script>

<svelte:head>
    <html lang="en-GB" />
    <title>Classes management</title>
    <meta name="description" content="The page where professors can manage their classes" />
    <meta name="robots" content="noindex" />
</svelte:head>

{#each classes as cl, index}
    <div tabindex="0" class="collapse w-96">
        <div class="collapse-title text-xl font-medium">{cl.name} - {cl.type}</div>
        <div class="collapse-content">
            <div class="flex flex-col">
                <p>Name: {cl.name}</p>
                <p>Description: {cl.description}</p>
                <p>Requirements: {cl.requirements}</p>
                <p>Type: {cl.type}</p>
            </div>
        </div>
    </div>
{/each}
