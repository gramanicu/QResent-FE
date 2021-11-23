<script>
    import { roleFromEnum } from '$lib/backend';
    import { goto } from '$app/navigation';
    import { role } from '$stores/authentication';
    import { beforeUpdate, onMount } from 'svelte';

    function redirect() {
        switch (roleFromEnum($role)) {
            case 0:
                goto('/home/users');
                break;
            case 1:
                goto('/home/edit-classes');
                break;
            case 2:
                goto('/home/classes');
                break;
        }
    }

    onMount(() => redirect());
    beforeUpdate(() => redirect());
</script>
