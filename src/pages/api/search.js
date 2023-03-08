import axios from 'axios';
import {log} from "next/dist/server/typescript/utils";

export default async function handler(req, res) {
	try {
		const { query } = req.query;
		const results = await axios.get(
			`https://api.rawg.io/api/games?key=856574f363d844d5935677771d6dd6bc&search=${query}`
		);
		if (results.data.results.length) {
			res.status(200).json(results.data.results)
		} else res.status(200).json(['No results'])
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}