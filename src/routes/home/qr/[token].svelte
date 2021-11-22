<script>
    import { page } from '$app/stores';
    import { callBackend, roleFromEnum } from '$lib/backend';
    import { goto } from '$app/navigation';
    import { role } from '$stores/authentication';
    import { onMount } from 'svelte';

    onMount(async () => {
        let userRole = roleFromEnum($role);
        if (!(userRole == 2)) {
            goto('/home');
            return;
        }

        try {
            const res = await callBackend('/meeting/add', 'POST', {
                startTime: new Date().toISOString(),
                subject: classes.find(cls => cls.id == class_id),
            });
        } catch (err) {
            console.error(err);
        }
    });
</script>

{$page.params.token}
