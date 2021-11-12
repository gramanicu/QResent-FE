<script>
	import '$scss/app.scss';
	import CloseSvg from '$components/svg/CloseSvg.svelte';
	import HamburgerSvg from '$components/svg/hamburger.svelte';

	const navItems = [
		{ label: 'Home', href: '#' },
		{ label: 'Item 1', href: '#' },
		{ label: 'Item 2', href: '#' },
		{ label: 'Item 3', href: '#' },
		{ label: 'Item 4', href: '#' },
		{ label: 'Item 5', href: '#' },
		{ label: 'Item 6', href: '#' }
	];
</script>

<div class="drawer drawer-mobile min-h-screen">
	<!-- Drawer toggler (hidden) -->
	<input id="layoutDrawer" type="checkbox" class="drawer-toggle" />

	<!-- Drawer content -->
	<main class="flex-grow block overflow-x-hidden bg-base-100 text-base-content drawer-content">
		<!-- The navbar -->
		<div class="sticky inset-x-0 top-0 z-50 navbar bg-base-100 shadow-lg ">
			<div class="lg:hidden">
				<label for="layoutDrawer" class="btn btn-square btn-ghost">
					<HamburgerSvg />
				</label>

				<div class="text-3xl px-4 font-title text-primary">
					<span>QResent</span>
				</div>
			</div>
		</div>

		<!-- The page contents -->
		<slot />
	</main>

	<!-- The mobile sidebar -->
	<div class="drawer-side shadow-lg border-r border-base-200">
		<label for="layoutDrawer" class="drawer-overlay border-b border-base-200" />
		<aside class="flex flex-col text-base-content w-80">
			<div
				class="sticky inset-x-0 top-0 z-50 w-full px-4 min-h-16 flex flex-row justify-between items-center border-b border-base-200 bg-base-100 shadow-lg"
			>
				<!-- Sidebar title -->
				<div class="text-3xl px-4 font-title text-primary">
					<span>QResent</span>
				</div>

				<!-- Hide sidebar button -->
				<div class="flex-none lg:hidden">
					<label for="layoutDrawer" class="btn btn-square btn-ghost">
						<CloseSvg />
					</label>
				</div>
			</div>
			<div>
				<ul class="menu flex flex-col pt-2 w-80 bg-base-100 text-lg p-4">
					{#each navItems as link}
						<li>
							<a href={link.href}>{link.label}</a>
						</li>
					{/each}
				</ul>
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
</style>
