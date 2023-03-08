import axios from 'axios';

export default async function handler(req, res) {
	try {
		const results = await axios.get(
			`https://api.rawg.io/api/platforms?key=856574f363d844d5935677771d6dd6bc`
		);
		res.status(200).json(results.data.results);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}