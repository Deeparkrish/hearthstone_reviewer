// design and Coding By- Dyravuth Yorn
const sequelize = require("../../config/connection");
const router = require("express").Router();
const axios = require("axios");
const { User, Card, Comment, Favorite } = require("../../models");
const withAuth = require("../../utils/auth");
// Get all comments - based on most recent one
router.get("/search", (req, res) => {
  const search = req.body.search;
  var options = {
    method: "GET",
    url: "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/" + search,
    headers: {
      "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.HS_APIKEY,
    },
  };
  console.log(options);
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
      res.json(error);
    });
});
router.get("/favorites/:id", (req, res) => {
  // query user model using req.params.id
  User.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Favorite,
        // include favorite model
        include: [{ model: Card }],
      },
    ],
  })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch(function (error) {
      console.error(error);
      res.json(error);
    });
  // send client data
});
// router.get("/:id", (req, res) => {});
router.get("/", (req, res) => {
  Card.findAll({
    attributes: ["id", "api_id", "card_name", "card_img"],
    include: [
      // include the Card details here:
      {
        model: Comment,
        attributes: ["id", "comment_text"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      // {
      //   model :User,
      //   attributes :['username']
      // }
    ],
  })
    .then((dbCardData) => res.json(dbCardData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Card.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "card_name", "api_id", "card_img"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbCardData) => {
      if (!dbCardData) {
        res.status(404).json({ message: "No card found with this id!" });
        return;
      }
      res.json(dbCardData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// must add routes for favorite
module.exports = router;
