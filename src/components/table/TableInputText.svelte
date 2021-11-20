<script>
    export let placeholder;
    export let name;
    export let value;
</script>

<div class="form-control">
    <input bind:value type="text" {name} {placeholder} class="{$$props.class} input input-sm input-bordered" />
</div>
