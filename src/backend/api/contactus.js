const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const resault = await knex("contactus").select("*");
    response.status(200).json(resault);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response, next) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const resault = await knex("contactus").select("*").insert(request.body);
    response.status(200).json(resault);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
