const express = require("express");
const router = express.Router();
const { User, Show } = require("../../models/index");

router.get("/", async (req, res) => {
	const users = await User.findAll();
	res.json(users);
});
router.get(`/:id`, async (req, res) => {
	const { id } = req.params;
	const user = await User.findByPk(id);
	res.json(user);
});
router.get(`/:id/showsWatched`, async (req, res) => {
	const { id } = req.params;
	const user = await User.findByPk(id, {include: Show});
    let shows = await user.getShows()
    let showsReduced = shows.reduce((acc, curr) => {
        acc.push({"id": curr.dataValues.id,"title":curr.dataValues.title, "genre": curr.dataValues.genre})
        return acc
    },[])
    console.log(showsReduced)
	res.json(showsReduced);
});
router.put(`/:userId/watched/:showId`, async (req, res) => {
	const { userId, showId } = req.params;
	const user = await User.findByPk(userId);
	const show = await Show.findByPk(showId);
    await user.addShow(show);
	res.send(`${user.username} just watched ${show.title}`);
});

module.exports = router;
