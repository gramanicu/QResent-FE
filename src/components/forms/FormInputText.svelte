<script>
    export let label;
    export let placeholder;
    export let name;
</script>

<div class="form-control">
    <label for={name} class="label">
        <span class="label-text">{label}</span>
    </label>
    <input type="text" {name} {placeholder} class="input input-primary input-bordered" />
</div>
