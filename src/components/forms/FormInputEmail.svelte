<script>
	export let label;
	export let placeholder;
</script>

<div class="form-control">
	<label class="label">
		<span class="label-text">{label}</span>
	</label>
	<input type="email" {placeholder} class="input input-primary input-bordered" />
</div>
