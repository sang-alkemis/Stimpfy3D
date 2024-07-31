<script lang="ts">
	import { page } from '$app/stores';
	import Spinner from '../../components/Spinner.svelte';
	import { setImgUrl } from '$lib/d_id';
	import { createAvatar, getAvatar } from '$lib/monster';
	// import

	let file: any;
	let url: any;
	//let url = 'https://ik.imagekit.io/nurman/iqbal_PfVKR7xgv.png?updatedAt=1721819590577';
	let gender = '';
	let btnAvatar = false;
	let isAvatar = false;

	const uploadUrl = 'https://upload.imagekit.io/api/v1/files/upload';
	const publicKey = 'private_pAfesmM8enhg2Up/GfC9OBWUMnY=';

	const handleFileUpload = async () => {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('fileName', file.name);

		try {
			const response = await fetch(uploadUrl, {
				method: 'POST',
				headers: {
					Authorization: `Basic ${btoa(publicKey + ':')}`
				},
				body: formData
			});

			const data = await response.json();
			console.log('Success:', data);
			url = data.url;

			console.log(url);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleFileChange = async (event: any) => {
		file = event.target.files[0];
		handleFileUpload();
	};

	const newAvatar = async () => {
		localStorage.setItem('gender', gender);
		isAvatar = true;
		btnAvatar = true;
		const id = await createAvatar(url, gender);
		const avatar = await getAvatar(id);
		console.log(avatar);
		setImgUrl('imageUrl', avatar);
		isAvatar = false;
	};

	const style = {
		title: `mx-4 text-sm`,
		section: `font-medium mb-4 pl-5 text-gray-500 text-lg lg:pl-6`,
		active: `border-green-500 border-l-4 lg:border-l-0 lg:border-r-4 lg:border-gray-500`,
		link: `flex items-center justify-start my-1 p-3 text-gray-800 w-full lg:hover:bg-gray-100`
	};
</script>

<section class="mt-6 px-5">
	{#if url}
		<!-- svelte-ignore a11y-img-redundant-alt -->
		<img src={url} alt="photo uploaded" class="rounded-2xl" />
	{:else}
		<div class="flex items-center justify-center w-full">
			<label
				for="dropzone-file"
				class="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-800 border-dashed rounded-2xl cursor-pointer hover:bg-gray-100"
			>
				<div class="flex flex-col items-center justify-center pt-5 pb-6">
					<svg
						class="w-8 h-8 mb-4 text-gray-800"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 16"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
						/>
					</svg>
					<p class="mb-2 text-sm text-gray-800">
						<span class="font-semibold">Click to upload</span>
					</p>
					<p class="text-xs text-gray-800">or drag photo</p>
				</div>
			</label>
			<input id="dropzone-file" type="file" class="hidden" on:change={handleFileChange} />
		</div>
	{/if}

	<!-- component -->
	<!-- <main class="grid min-h-screen w-full place-items-center"> -->
	<div class="p-2 w-full flex gap-2">
		<div>
			<input
				type="radio"
				name="option"
				id="male"
				value="male"
				class="peer hidden"
				bind:group={gender}
			/>
			<label
				for="male"
				class="block cursor-pointer select-none rounded-2xl p-2 text-center border-2 border-gray-800 peer-checked:border-blue-500 peer-checked:font-semibold peer-checked:text-blue-500"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M18.41 3.41L16 4.5l2.41 1.09L19.5 8l1.1-2.41L23 4.5l-2.4-1.09L19.5 1M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10c0-1.47-.33-2.87-.9-4.13l-1.24 2.72c.08.46.14.91.14 1.41c0 4.43-3.57 8-8 8s-8-3.57-8-8v-.13a10 10 0 0 0 5.74-5.56A10 10 0 0 0 17.5 10a10 10 0 0 0 1.33-.09l-1.48-3.26L12.6 4.5l3.53-1.6C14.87 2.33 13.47 2 12 2m-3 9.75A1.25 1.25 0 0 0 7.75 13A1.25 1.25 0 0 0 9 14.25A1.25 1.25 0 0 0 10.25 13A1.25 1.25 0 0 0 9 11.75m6 0A1.25 1.25 0 0 0 13.75 13A1.25 1.25 0 0 0 15 14.25A1.25 1.25 0 0 0 16.25 13A1.25 1.25 0 0 0 15 11.75"
					/></svg
				>
				<p>Pria</p>
			</label>
		</div>

		<div>
			<input
				type="radio"
				name="option"
				id="female"
				value="female"
				class="peer hidden"
				bind:group={gender}
			/>
			<label
				for="female"
				class="block cursor-pointer select-none rounded-2xl p-2 text-center border-2 border-gray-800 peer-checked:border-pink-500 peer-checked:font-semibold peer-checked:text-pink-500"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="m19.5 1l-1.09 2.41L16 4.5l2.41 1.09L19.5 8l1.1-2.41L23 4.5l-2.4-1.09zM12 2C6.5 2 2 6.5 2 12v10h20V12c0-1.47-.33-2.87-.9-4.13l-1.24 2.72c.08.46.14.91.14 1.41c0 4.43-3.57 8-8 8s-8-3.57-8-8v-.13a10 10 0 0 0 5.74-5.56A10 10 0 0 0 17.5 10a10 10 0 0 0 1.33-.09l-1.48-3.26L12.6 4.5l3.53-1.6C14.87 2.33 13.47 2 12 2m-3 9.75A1.25 1.25 0 0 0 7.75 13A1.25 1.25 0 0 0 9 14.25A1.25 1.25 0 0 0 10.25 13A1.25 1.25 0 0 0 9 11.75m6 0A1.25 1.25 0 0 0 13.75 13A1.25 1.25 0 0 0 15 14.25A1.25 1.25 0 0 0 16.25 13A1.25 1.25 0 0 0 15 11.75"
					/></svg
				>
				<p>Wanita</p>
			</label>
		</div>
	</div>

	<button
		class="py-2 px-4 bg-blue-700 text-white flex items-center justify-center w-full rounded-2xl"
		on:click={newAvatar}
		disabled={btnAvatar}
	>
		<Spinner loading={isAvatar} text="Process" />
	</button>
	<!-- </main> -->
</section>

<style>
	button:disabled {
		cursor: not-allowed;
		opacity: 0.2;
	}
</style>
