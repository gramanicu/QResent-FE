<script>
	import VisibilitySvg from '$components/svg/VisibilitySvg.svelte';

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
	<div class="relative flex">
		<input
			id="password"
			type={visible ? 'text' : 'password'}
			{placeholder}
			class="input input-primary input-bordered w-full pr-16 " />

		<button
			class="absolute top-0 right-0 rounded-l-none btn btn-primary text-neutral-content"
			on:click={toggleViewPass}>
			<VisibilitySvg />
		</button>
	</div>
</div>

<style>
</style>
