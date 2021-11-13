<script>
	import '$scss/app.scss';
	import CloseSvg from '$components/svg/CloseSvg.svelte';
	import HamburgerSvg from '$components/svg/Hamburger.svelte';
	import TextLogo from '$components/branding/textLogo.svelte';

	const navItems = [
		{ label: 'Home', href: '#' },
		{ label: 'Item 1', href: '#' },
		{ label: 'Item 2', href: '#' },
		{ label: 'Item 3', href: '#' },
		{ label: 'Item 4', href: '#' },
		{ label: 'Item 5', href: '#' },
		{ label: 'Item 6', href: '#' },
	];
</script>

<div class="drawer drawer-mobile min-h-screen">
	<!-- Drawer toggler (hidden) -->
	<input id="layoutDrawer" type="checkbox" class="drawer-toggle" />

	<!-- Drawer content -->
	<main class="flex-grow block overflow-x-hidden bg-base-100 text-base-content drawer-content">
		<!-- The navbar -->
		<div class="sticky inset-x-0 top-0 z-50 navbar bg-base-100  border-b border-base-300">
			<div class="lg:hidden navbar-start">
				<label for="layoutDrawer" class="btn btn-square btn-ghost">
					<HamburgerSvg />
				</label>

				<TextLogo />
			</div>

			<div class="navbar-end lg:justify-self-end lg:w-full hidden lg:flex flex-row gap-1">
				<a class="btn btn-ghost btn-sm rounded-btn" href="/auth/signin"> Sign In </a>
				<a class="btn btn-primary btn-sm rounded-btn text-neutral-content" href="/auth/signup"> Sign Up </a>

				<!-- User dropdown menu -->
				<div class="dropdown dropdown-end">
					<div tabindex="0" class="btn btn-circle btn-ghost btn-xs text-info">
						<!-- Information svg - TODO - move into component or remove -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="inline w-5 h-5 stroke-current">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<div
						tabindex="0"
						class="shadow-lg border border-gray-300 card compact dropdown-content bg-base-100 rounded-box p-2 gap-1 menu">
						<a class="p-2 bg-base-100 hover:bg-base-300 rounded-lg whitespace-nowrap" href="/auth/signout"
							><p>Sign Out</p></a>
						<a class="p-2 bg-base-100 hover:bg-base-300 rounded-lg whitespace-nowrap" href="/auth/signout"
							><p>Sign Out</p></a>
						<a class="p-2 bg-base-100 hover:bg-base-300 rounded-lg whitespace-nowrap" href="/auth/signout"
							><p>Sign Out</p></a>
					</div>
				</div>
			</div>
		</div>

		<!-- The page contents -->
		<slot />
	</main>

	<!-- The mobile sidebar -->
	<div class="drawer-side border-r border-base-300">
		<label for="layoutDrawer" class="drawer-overlay border-b border-base-300" />
		<aside class="flex flex-col text-base-content w-80 bg-base-100 justify-items-stretch">
			<div
				class="sticky inset-x-0 top-0 z-50 w-full px-4 min-h-16 flex flex-row justify-between items-center border-b border-base-300 bg-base-100">
				<!-- Sidebar title -->
				<TextLogo />

				<!-- Hide sidebar button -->
				<div class="flex-none lg:hidden">
					<label for="layoutDrawer" class="btn btn-square btn-ghost">
						<CloseSvg />
					</label>
				</div>
			</div>
			<!-- Navigation links -->
			<div class="flex-grow">
				<ul class="menu flex flex-col pt-2 w-80 bg-base-100 text-lg p-4">
					{#each navItems as link}
						<li>
							<a href={link.href}>{link.label}</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Auth Links -->
			<div class="flex lg:hidden flex-col w-full p-2 border-t rounded justify-self-end">
				<div class="flex flex-row w-full items-center justify-center">
					<a class="btn btn-ghost btn-sm rounded-btn" href="/auth/signin"> Sign In </a>
					<div class="divider divider-vertical">or</div>
					<a class="btn btn-primary btn-sm rounded-btn text-neutral-content" href="/auth/signup"> Sign Up </a>
				</div>

				<!-- TODO - show depending on the auth state -->
				<!-- <div class="flex flex-row justify-center items-center">
					<a class="btn btn-ghost btn-sm rounded-btn" href="/auth/signout">Sign Out</a>
				</div> -->
			</div>
		</aside>
	</div>
</div>

<style lang="scss">
	.drawer-toggle {
		display: none;

		&:checked ~ .drawer-side {
			overflow: hidden;
		}
	}

	.drawer-side {
		overflow-x: hidden;
	}

	.dropdown-content.menu {
		min-width: 12rem;
	}
</style>
