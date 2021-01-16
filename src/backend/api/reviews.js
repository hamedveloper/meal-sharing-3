const express = require("express");
const router = express.Router();
const knex = require("../database");
const createError = require("http-errors");

//...........................................Returns all meals

router.get("/", async (request, response, next) => {
  // knex syntax for selecting things. Look up the documentation for knex for further info
  await knex("reviews")
    .select("*")
    .then((x) => {
      if (!x) {
        throw createError(404, "not found");
      } else return response.status(200).json(x);
    })
    .catch((error) => next(error));
});

/////////////////////////////////////////////Returns Avarge Star for every meal

router.get("/:id", async (request, response, next) => {
  // knex syntax for selecting things. Look up the documentation for knex for further info
  await knex("reviews")
    .avg("numberOfStars")
    .where({ mealId: request.params.id })
    .then((x) => {
      if (!x) {
        throw createError(404, "not found");
      } else return response.status(200).json(x);
    })
    .catch((error) => next(error));
});

//............................................Adds a new review

router.post("/", async (request, response, next) => {
  // knex syntax for selecting things. Look up the documentation for knex for further info

  await knex("reviews")
    .insert(request.body)
    .then((x) => {
      if (!x) {
        throw createError(404, "not found");
      } else return response.status(200).json(x);
    })
    .catch((error) => next(error));
});

//...................................................Returns reviews by  mealId

router.get("/meal/:id", async (request, response, next) => {
  // knex syntax for selecting things. Look up the documentation for knex for further info
  await knex("reviews")
    .select("*")
    .where({
      mealId: request.params.id,
    })
    .then((x) => {
      if (!x) {
        throw createError(404, "not found");
      } else return response.status(200).json(x);
    })
    .catch((error) => next(error));
});

//.......................................................Deletes the review by id

router.delete("/:id", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const resault = await knex("reviews")
      .select("*")
      .where({
        id: request.params.id,
      })
      .delete();
    response.json(resault);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
