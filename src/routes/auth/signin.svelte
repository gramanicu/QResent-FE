<script>
	import FormInputText from '$components/forms/FormInputText.svelte';
	import FormInputEmail from '$components/forms/FormInputEmail.svelte';
	import FormInputPassword from '$components/forms/FormInputPassword.svelte';
</script>

<div class="flex flex-col justify-center items-center w-full h-full">
	<div class="w-64 h-64">
		<FormInputText placeholder="Username" label="Username" />
		<FormInputEmail placeholder="Email" label="Email" />
		<FormInputPassword placeholder="Password" label="Password" />
	</div>
</div>

<style>
</style>
