import axios from "axios";

export default async function handler(req, res) {
	const { id } = req.query;
	
	try {
		const [gameRes, screenshotsRes] = await Promise.all([
			axios.get(`https://api.rawg.io/api/games/${id}?key=856574f363d844d5935677771d6dd6bc`),
			axios.get(`https://api.rawg.io/api/games/${id}/screenshots?key=856574f363d844d5935677771d6dd6bc`)
		]);
		
		const gameData = { ...gameRes.data, screenshots: screenshotsRes.data.results };
		
		res.status(200).json(gameData);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
}