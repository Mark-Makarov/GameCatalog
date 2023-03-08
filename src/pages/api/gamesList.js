import axios from "axios";

export default async function handler(req, res) {
	const { page, platforms } = req.query;
	
	try {
		const response = await axios.get(
			`https://api.rawg.io/api/games?key=856574f363d844d5935677771d6dd6bc&page=${page}&platforms=${platforms}`
		);
		const count = response.data.count;
		const results = response.data.results;
	
		res.status(200).json({ count : count , results : results});
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal Server Error");
	}
}
