<script>
	// @ts-nocheck

	import { sidebarOpen } from '../store';
	import SidebarItems from './SidebarItems.svelte';
	import SidebarHeader from './SidebarHeader.svelte';
	import Addphoto from '../../components/VideoPlayer.svelte';

	const style = {
		mobileOrientation: {
			start: 'left-0',
			end: 'right-0'
		}
	};

	export let mobileOrientation = 'end';
</script>

<aside
	class={`
	  	top-0
	  	h-screen
	  	scrollbar
      bg-gray-200
      overflow-y-auto
      lg:bg-transparent lg:block lg:relative lg:w-64
      ${style.mobileOrientation[mobileOrientation]}
      ${$sidebarOpen ? 'absolute w-8/12 z-40 sm:w-5/12' : 'hidden'}
   `}
>
	<div class="pb-32 lg:pb-6">
		<SidebarHeader />
		<SidebarItems />
	</div>
</aside>

<style>
	.scrollbar::-webkit-scrollbar {
		width: 0;
		background: transparent; /* hide Sidebar scrollbar on Chrome, Opera and other webkit Browsers*/
	}
	.scrollbar {
		-ms-overflow-style: none;
	}
</style>
