<script>
	import { openSidebar } from './store';
</script>

<header class="h-16 items-center relative w-full z-10 md:h-20">
	<div class="flex flex-col h-full justify-center mx-auto px-3 relative">
		<div class="flex items-center pl-1 relative w-full sm:pr-2 sm:ml-0 lg:max-w-68">
			<div class="container flex h-full left-0 relative w-3/4">
				<div class="flex group h-full items-center relative w-12">
					<button
						type="button"
						aria-expanded="false"
						aria-label="Toggle sidenav"
						on:click={openSidebar}
						class="text-4xl text-gray-700 focus:outline-none lg:hidden"
					>
						&#8801;
					</button>
				</div>
			</div>
			<div
				class="flex items-center justify-end gap-1 ml-5 p-1 relative w-9/12 sm:mr-0 sm:right-auto md:w-1/4"
			>
				<span class="block py-5 relative">
					<img
						alt="Dave Glad"
						src="/images/stimpfy3d.jpg"
						class=" w-12 mx-auto object-cover rounded-xl"
					/>
				</span>
				<h1 class=" font-bold text-2xl text-gray-800">Stimpfy3D</h1>
			</div>
		</div>
	</div>
</header>
