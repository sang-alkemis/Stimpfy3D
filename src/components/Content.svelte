<script lang="ts">
	import VideoPlayer from './VideoPlayer.svelte';
	import TextArea from './TextArea.svelte';
	import Spinner from './Spinner.svelte';
	import { generateTalk, getOutput, getImgUrl } from '../lib/d_id';

	let imageUrl: any;
	let message: any;
	let id: any;
	let src: any;

	let isVideo = false;
	let btnVideo = false;
	let isDownload = false;
	let gender = '';

	async function handleGenerate() {
		gender = JSON.stringify(localStorage.getItem('gender'));
		console.log('gender=>', gender);
		isVideo = true;
		btnVideo = true;
		imageUrl = getImgUrl('imageUrl');
		console.log('imageUrl', imageUrl);
		id = await generateTalk(imageUrl, message, gender);

		console.log(id);

		src = await getOutput(id);
		isVideo = false;
		console.log(src);
	}

	function updateText(newText: string) {
		message = newText;
	}

	function exportVideo() {
		isDownload = true;
		window.open(src, '_blank');
		isDownload = false;
	}
</script>

<div>
	{#if src}
		<div
			class="flex flex-wrap md:flex-nowrap items-center justify-center w-full rounded-2xl py-6 px-12 bg-gray-400"
		>
			<VideoPlayer {src} controls autoplay={false} />
		</div>
	{:else}
		<span />
	{/if}

	<div class="mt-6 mb-3 text-gray-700 font-medium">Text for Speech</div>
	<div class="p-4 font-normal rounded-2xl" style=" background-color: rgba(158, 158, 158, 0.3)">
		<div class="flex justify-end pb-2 mb-6 border-b border-gray-600">
			<div class="mr-auto flex">
				<label class="inline-flex items-center cursor-pointer">
					<input type="checkbox" value="" class="sr-only peer" disabled />
					<div
						class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
					/>
					<span class="ms-3 text-gray-400 dark:text-gray-500">Subtitle</span>
				</label>
			</div>
			<div class="mx-auto flex">
				<button
					class="border-gray-800 rounded-full px-5 py-1 border text-gray-800 text-center"
					on:click={handleGenerate}
					disabled={btnVideo}
				>
					<Spinner loading={isVideo} text="Generate" />
				</button>
			</div>
			<div class="ml-auto flex">
				<div>
					<button
						class="border-gray-800 rounded-full px-5 py-1 border text-gray-800"
						on:click={exportVideo}
					>
						<Spinner loading={isDownload} text="Export" />
					</button>
				</div>
			</div>
		</div>

		<div class="flex justify-end">
			<TextArea {message} onTextChange={updateText} />
		</div>
	</div>
</div>

<style>
	button:disabled {
		cursor: not-allowed;
		opacity: 0.2;
	}
</style>
