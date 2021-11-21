<script>
    import FormInputText from '$components/forms/FormInputText.svelte';
    import FormInputEmail from '$components/forms/FormInputEmail.svelte';
    import FormInputPassword from '$components/forms/FormInputPassword.svelte';
    import FormLink from '$components/forms/FormLink.svelte';
</script>

<div class="flex flex-col justify-center items-center w-full h-full screen-container">
    <div
        class="login-reg-container rounded-lg max-w-md w-full p-8 pt-6 border-2 shadow-2xl bg-base-100 border-base-300">
        <h1 class="font-medium text-xl text-center mb-2">Sign Up</h1>
        <FormInputText name="username" placeholder="Username" label="Username" />
        <div class="grid grid-cols-1 md:grid-cols-2  w-full gap-0 md:gap-4">
            <FormInputText class="flex-1" name="first_name" placeholder="First Name" label="First Name" />
            <FormInputText class="flex-1" name="last_name" placeholder="Last Name" label="Last Name" />
        </div>
        <FormInputEmail name="email" placeholder="Educational Institution Email" label="Email" />
        <FormInputPassword id="password" name="password" placeholder="Password" label="Password" />
        <FormInputPassword
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            label="Confirm password" />
        <button class="btn btn-primary btn-block mt-12 text-neutral-content">Register</button>
        <div class="mt-5 text-center">
            <p>
                Registered already?
                <FormLink url="/auth/signin" text="Log In" />
            </p>
        </div>
    </div>
</div>

<style lang="scss">
    div.screen-container {
        background: #ffffff;
        background: linear-gradient(135deg, hsla(var(--n)) -10%, hsla(var(--p)) 70%, hsla(var(--pf)) 105%);
    }
</style>
