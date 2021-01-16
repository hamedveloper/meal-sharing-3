const express = require("express");
const router = express.Router();
const knex = require("../database");
const createError = require("http-errors");

//...........................................Returns all meals

router.get("/", async (request, response) => {
  const {
    maxPrice,
    availableReservations,
    title,
    createdAfter,
    limit,
  } = request.query;
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    if (Object.keys(request.query).length === 0) {
      const resault = await knex("meals").select("*");
      response.json(resault);

      //.............................................Get meals that has a price smaller than maxPrice
    } else if (maxPrice) {
      let resault = await knex("meals")
        .select("*")
        .where("price", "<", maxPrice);
      response.send(resault);
    } else if (availableReservations) {
      let resault = await knex("meals")
        .select("*")
        .where("maxNumberOfGuests", ">", 0);
      response.send(resault);
    } else if (title) {
      let resault = await knex("meals")
        .select("*")
        .where("title", "like", `%${title}%`);
      response.send(resault);
    } else if (createdAfter) {
      let resault = await knex("meals")
        .select("*")
        .where("createdAt", ">", createdAfter);
      response.send(resault);
    } else if (limit) {
      let resault = await knex("meals").select("*").limit(limit);
      response.send(resault);
    }
  } catch (error) {
    throw error;
  }
});

//...........................................Adds a new meal

router.post("/", async (request, response, next) => {
  // knex syntax for selecting things. Look up the documentation for knex for further info
  await knex("meals")
    .select("*")
    .insert(request.body)
    .then((x) => {
      if (!x) {
        throw createError(404, "not found");
      } else return response.status(200).json(x);
    })
    .catch((error) => next(error));
});

////////////////////Reset number of guests after booking based on the booking guest amount

router.put("/:id", async (request, response) => {
  const { numberOfGuests, averageRate } = request.query;
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    if (Object.keys(request.query).length === 0) {
      const resault = await knex("meals").select("*");
      response.json(resault);
    } else if (numberOfGuests) {
      let resault = await knex("meals")
        .select("*")
        .where({ id: request.params.id })
        .update({ number_of_guests: numberOfGuests });
      response.json(resault);
    } else if (averageRate) {
      let resault = await knex("meals")
        .select("*")
        .where({ id: request.params.id })
        .update({ averageRate: averageRate });
      response.json(resault);
    }
  } catch (error) {
    throw error;
  }
});
//..........................................Returns meal by id

router.get("/:id", async (request, response, next) => {
  // knex syntax for selecting things. Look up the documentation for knex for further info
  await knex("meals")
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

//............................................Deletes the meal by id

router.delete("/:id", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("meals")
      .select("*")
      .where({
        id: request.params.id,
      })
      .delete();
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
