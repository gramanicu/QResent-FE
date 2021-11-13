<script>
	import FormInputText from '$components/forms/FormInputText.svelte';
	import FormInputEmail from '$components/forms/FormInputEmail.svelte';
	import FormInputPassword from '$components/forms/FormInputPassword.svelte';
</script>

<div class="flex flex-col justify-center items-center w-full h-full">
	<div class="login-reg-container rounded-lg w-96 p-8 shadow-lg">
		<!-- <FormInputText placeholder="Username" label="Username" /> -->
		<FormInputEmail placeholder="Email" label="Email" />
		<FormInputPassword placeholder="Password" label="Password" />
		<div class="w-full text-right mt-4">
			<a href="#">Forgot password?</a>
		</div>
		<button class="btn btn-primary btn-block mt-6 text-neutral-content">Login</button>
		<div class="inline-block text-center mt-5 rememberme-div">
			<p>Remember me?<input type="checkbox" class="checkbox-remember checkbox checkbox-primary checkbox-sm" /></p>
		</div>
	</div>
</div>

<style>
	.login-reg-container {
		border: none;
	}

	.checkbox-remember {
		margin-left: 10px;
	}

	.rememberme-div p,
	.rememberme-div input {
		vertical-align: middle;
	}
</style>
