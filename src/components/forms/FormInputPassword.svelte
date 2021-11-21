<script>
    import VisibilitySvg from '$components/svg/VisibilitySvg.svelte';

    export let label;
    export let placeholder;
    export let name;
    export let id = 'password';

    let visible = false;

    function toggleViewPass() {
        visible = !visible;
    }
</script>

<div class="form-control">
    <label for={name} class="label">
        <span class="label-text">{label}</span>
    </label>
    <div class="relative flex">
        <input
            {id}
            type={visible ? 'text' : 'password'}
            {name}
            {placeholder}
            class="input input-primary input-bordered w-full pr-16 " />

        <button
            class="absolute top-0 right-0 rounded-l-none btn btn-primary text-neutral-content"
            on:click={toggleViewPass}>
            <VisibilitySvg visible={!visible} />
        </button>
    </div>
</div>

<style>
</style>
