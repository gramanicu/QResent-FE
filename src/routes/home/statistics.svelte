<script>
    import { callBackend, roleFromEnum } from '$lib/backend';
    import { goto } from '$app/navigation';
    import { role } from '$stores/authentication';
    import { onMount } from 'svelte';

    onMount(async () => {
        let userRole = roleFromEnum($role);
        if (!(userRole == 1)) {
            goto('/home');
            return;
        }
        const res_subjects = await callBackend('/subject/get-all', 'GET');
        res_subjects.forEach(cls => {
            subjects = [...subjects, { ...cls }];
        });
    });

    let subjects = [];
</script>

<svelte:head>
    <html lang="en-GB" />
    <title>Classes statistics page</title>
    <meta name="description" content="The page where professors can view the statistics for their classes" />
    <meta name="robots" content="noindex" />
</svelte:head>
