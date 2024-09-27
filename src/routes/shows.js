const express = require("express");
const router = express.Router();
const { User, Show } = require("../../models/index");

router.get("/getGenre", async (req, res) => {
	const genreSelected = req.query.genre;
	const showsWithSelectedGenre = await Show.findAll({
		where: {
			genre: genreSelected,
		},
	});
    let shows = showsWithSelectedGenre.reduce((acc, curr) => (acc.push(curr.dataValues), acc),[])
    console.log(showsWithSelectedGenre)
	res.send(shows);
});
router.get("/", async (req, res) => {
	const shows = await Show.findAll();
	res.json(shows);
});

router.get(`/:id`, async (req, res) => {
	const { id } = req.params;
	const show = await Show.findByPk(id);
	res.json(show);
});

router.get(`/:id/usersWatched`, async (req, res) => {
	const { id } = req.params;
	const show = await Show.findByPk(id, { include: User });
	let users = await show.getUsers();
	// console.log(users)
	let usersReduced = users.reduce((acc, curr) => {
		acc.push(curr.dataValues.username);
		return acc;
	}, []);
	res.json(usersReduced);
});

router.put("/:id", async (req, res, next) => {
	// add validation that only avaiable property is changed-can checck if the body only have 1 property and the key is called avalible
	const { id } = req.params;
	try {
		let show = await Show.findByPk(id);
		show = await show.update(req.body);
		res.json(show);
	} catch (e) {
		console.error(e);
		next(e);
	}
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	let show = await Show.findByPk(id);
	show = await show.destroy();
	res.json(show);
});

module.exports = router;
