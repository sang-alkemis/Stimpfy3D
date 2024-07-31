<script lang="ts">
	export let message = '';
	export let onTextChange: any;

	function handleInput(event: any) {
		message = event.target.value;
		onTextChange(message);
	}
</script>

<textarea
	bind:value={message}
	on:input={handleInput}
	id="message"
	rows="8"
	class="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
	placeholder="Ketik skrip untuk video"
/>
