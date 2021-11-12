<script>
	import '../app.scss';
	import CloseSvg from '$components/svg/CloseSvg.svelte';
	import HamburgerSvg from '$components/svg/hamburger.svelte';

	const navItems = [
		{ label: 'Home', href: '#' },
		{ label: 'Item 1', href: '#' },
		{ label: 'Item 2', href: '#' },
		{ label: 'Item 3', href: '#' }
	];
</script>

<div class="drawer drawer-end">
	<!-- Drawer toggler (hidden) -->
	<input id="layoutDrawer" type="checkbox" class="drawer-toggle" />

	<!-- Drawer content -->
	<div class="flex flex-col drawer-content">
		<!-- The navbar -->
		<div class="navbar bg-base-100 shadow-lg ">
			<div class="px-2 mx-2 navbar-start">
				<span class="text-lg font-bold"> QResent </span>
			</div>

			<!-- The desktop navigation items -->
			<div class="navbar-end flex-1 hidden lg:flex">
				<ul class="menu horizontal">
					{#each navItems as link}
						<li>
							<a class="btn btn-ghost rounded-btn" href={link.href}>{link.label}</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Show/Hide side menu button (mobile only) -->
			<div class="navbar-end flex-none lg:hidden">
				<label for="layoutDrawer" class="btn btn-square btn-ghost">
					<HamburgerSvg />
				</label>
			</div>
		</div>

		<!-- The page contents -->
		<slot />
	</div>

	<!-- The mobile sidebar -->
	<div class="drawer-side shadow-2xl">
		<label for="layoutDrawer" class="drawer-overlay" />
		<ul class="p-4 overflow-y-auto menu w-80 min-h-screen bg-base-100 text-lg">
			<li class="menu-title flex flex-row justify-between">
				<span>QResent</span>

				<!-- Hide sidebar button -->
				<div class="flex-none">
					<label for="layoutDrawer" class="btn btn-square btn-ghost">
						<CloseSvg />
					</label>
				</div>
			</li>

			{#each navItems as link}
				<li>
					<a href={link.href}>{link.label}</a>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style lang="scss">
	.menu {
		li.menu-title {
			@apply mb-2;

			span {
				@apply text-lg;
			}
		}
	}

	.drawer-toggle {
		display: none;
	}

	.drawer-side {
		overflow-x: hidden;

		li.menu-title > span {
			--tw-text-opacity: 0.7;
		}

		@media (min-width: 1024px) {
			& {
				display: none;
			}
		}
	}
</style>
