let MalePrompt =
	'Generate an image of a man in his early 30s. He should be standing with a neutral, slightly serious expression, and his hands clasped in front of him. He is wearing a black sweater under a blue blazer. The background should be plain white or light-colored with no discernible details.';

let FemalePrompt =
	'Generate an image of a woman in her early 30s. She should be standing with a neutral, slightly serious expression, and her hands clasped in front of her. She is wearing a black sweater under a blue blazer and a hijab. The background should be plain white or light-colored with no discernible details';

let prompt;

const option = {
	accept: 'application/json',
	authorization:
		'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjM1YWNkZWEzN2JjOWJjNTY4NWQ4YjcyOTNjMzAzNjFiIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDctMjFUMDA6MjA6MDEuMjg0MTI5In0.UOGQwtqn5CBz2BG6A2ntBTgktetJk-QOqG90cSdla2s'
};

async function createAvatar(image: any, gender: any) {
	if (gender === 'male') {
		prompt = MalePrompt;
	} else {
		prompt = FemalePrompt;
	}
	const formData = new FormData();
	formData.append('optimize', 'false');
	formData.append('safe_filter', 'true');
	formData.append('prompt', prompt);
	formData.append(
		'negprompt',
		'deformed, bad anatomy, disfigured, poorly drawn face, Avoid side profiles, back views, tilted heads, looking down, or looking up. The man should be facing directly forward with his eyes looking straight at the camera. Avoid any distortions or asymmetrical features in the face. Ensure both hands are visible and clasped in front of him, avoiding any poses where the hands are hidden, in pockets, or positioned elsewhere.'
	);
	formData.append('init_image_url', image);

	try {
		const response = await fetch('https://api.monsterapi.ai/v1/generate/photo-maker', {
			method: 'POST',
			headers: option,
			body: formData
		});
		const data = await response.json();
		const id = data.status_url;
		console.log(id);
		return id;
	} catch (error) {
		console.error('Gagal membuat avatar', error);
		alert(error);
		throw error;
	}
}

async function getAvatar(processId: any) {
	try {
		let status = 'IN_PROGRESS';
		while (status === 'IN_PROGRESS') {
			const response = await fetch(processId, {
				method: 'GET',
				headers: option
			});

			const data = await response.json();
			status = data.status;

			if (status === 'IN_PROGRESS') {
				setTimeout(() => console.log('Process is still in progress...'), 5000);
			} else if (status === 'COMPLETED') {
				const result = data.result.output[0];
				return new Promise((resolve) => {
					console.log('Output URL:', result);
					alert('DONE');
					window.open(result, '_blank');
					console.clear();
					resolve(result);
				});
			} else {
				throw new Error(`Unexpected status: ${status}`);
			}
		}
	} catch (error) {
		console.error('Url Avatar', error);
		alert(error);
		throw error;
	}
}

export { createAvatar, getAvatar };
