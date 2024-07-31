// trial
// const token = 'Basic bnVybWFuLmF3YWx1ZGRpbjIwMjBAZ21haWwuY29t:DEQyeeqhYFDs0DpmMnrmH';

// premium
const token = 'Basic bnVybWFuLmF3YWx1ZGRpbjIwMTdAZ21haWwuY29t:MLnw_uayxFL7Qb1dgbqOy';
let sarah = 'EXAVITQu4vr4xnSDxMaL';
let brian = 'nPczCjzI2devNBz1zQrb';
let voiceID;

async function generateTalk(image: string, input: string, gender: string) {
	if (gender === 'male') {
		voiceID = brian;
	} else {
		voiceID = sarah;
	}

	console.log('from generat', gender);
	try {
		const response = await fetch('https://api.d-id.com/talks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token
			},
			body: JSON.stringify({
				script: {
					type: 'text',
					input: input,
					provider: {
						type: 'elevenlabs',
						voice_id: voiceID,
						voice_config: {
							stability: 0.5,
							similarity_boost: 1
						}
					}
				},
				source_url: image,
				config: {
					stitch: true,
					output_resolution: 1080
				}
			}),
			redirect: 'follow'
		});
		if (!response.ok) {
			throw new Error(`HTTP error ${response.status}`);
		}

		const data = await response.json();
		const id = data.id;
		return id;
	} catch (error) {
		console.error('Error logging in:', error);
		alert(error);
		throw error;
	}
}

async function getOutput(id: string) {
	try {
		let result = undefined;
		while (result === undefined) {
			const response = await fetch(`https://api.d-id.com/talks/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				}
			});
			const data = await response.json();
			result = await data.result_url;
			if (result === undefined) {
				setTimeout(() => console.log('Video Generate is still in progress...'), 10000);
			} else if (result !== undefined) {
				return new Promise((resolve) => {
					const videoUrl = data.result_url;
					console.log('Video URL:', videoUrl);
					alert('Video Berhasil di Buat');
					console.clear();
					resolve(videoUrl);
				});
			} else {
				throw new Error(`Unexpected status: ${result}`);
			}
		}

		console.log(result);
		return result;
	} catch (error) {
		console.error('Error logging in:', error);
		alert(error);
		throw error;
	}
}

function setImgUrl(item: any, url: any) {
	localStorage.setItem(item, url);
}

function getImgUrl(item: any) {
	return localStorage.getItem(item);
}

export { generateTalk, getOutput, setImgUrl, getImgUrl };
