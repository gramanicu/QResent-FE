<script>
	export let label;
	export let placeholder;
</script>

<div class="form-control">
	<label class="label">
		<span class="label-text">{label}</span>
	</label>
	<input type="password" {placeholder} class="input" />
</div>