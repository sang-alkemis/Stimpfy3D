<script>
	export let src;
	export let controls = true;
	export let autoplay = false;
	export let loop = false;
	export let muted = false;
</script>

<video
	class="rounded-2xl w-1/2 h-1/2"
	{src}
	{controls}
	{autoplay}
	{loop}
	{muted}
	controlslist="nodownload"
>
	Browser Anda tidak mendukung tag video HTML5.
</video>
