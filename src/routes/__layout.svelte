<script>
    import '$scss/app.scss';

    import { onMount } from 'svelte';
    import { jwt } from '$stores/authentication';
    import { goto } from '$app/navigation';

    onMount(() => {
        if ($jwt) {
            goto('/home');
        }
    });
</script>

<div class="w-screen h-screen overflow-hidden">
    <slot />
</div>

<style lang="scss">
</style>
