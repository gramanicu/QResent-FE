<script>
	export let label;
	export let placeholder;
	let visible = false;

	function toggleViewPass() {
		visible = !visible;
	}
</script>

<div class="form-control">
	<label class="label">
		<span class="label-text">{label}</span>
	</label>
	<div class="relative">
		<input
			id="password"
			type={visible ? 'text' : 'password'}
			{placeholder}
			class="input input-primary input-bordered password" />
		<button type="button" class="btn btn-primary text-neutral-content" on:click={toggleViewPass}>Hide</button>
	</div>
</div>

<style>
	.password {
		width: 15.62rem;
	}
</style>
