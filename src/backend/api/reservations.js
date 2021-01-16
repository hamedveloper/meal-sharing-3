const express = require("express");
const router = express.Router();
const knex = require("../database");
const createError = require("http-errors");

//...........................................Returns all meals

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const resault = await knex("reservations").select("*");
    response.json(resault);
  } catch (error) {
    throw error;
  }
});

//............................................Adds a new reservation

router.post("/", async (request, response, next) => {
  // knex syntax for selecting things. Look up the documentation for knex for further info
  await knex("reservations")
    .select("*")
    .insert(request.body)
    .then((x) => {
      if (!x) {
        throw createError(404, "not found");
      } else return response.status(200).json(x);
    })
    .catch((error) => next(error));
});

//...................................................Returns reservation by id

router.get("/:id", async (request, response, next) => {
  // knex syntax for selecting things. Look up the documentation for knex for further info
  await knex("reservations")
    .select("*")
    .where({
      id: request.params.id,
    })
    .then((x) => {
      if (!x) {
        throw createError(404, "not found");
      } else return response.status(200).json(x);
    })
    .catch((error) => next(error));
});

//.......................................................Deletes the reservation by id

router.delete("/:id", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const resault = await knex("reservations")
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
