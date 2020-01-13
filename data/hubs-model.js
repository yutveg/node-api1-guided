const knex = require("knex");

const knexfile = require("../knexfile.js");

const environment = process.env.NODE_ENV || "development";
const knexConfiguration = knexfile[environment];
const db = knex(knexConfiguration);

module.exports = {
  find,
  findById,
  add,
  remove,
  update
};

// GET /hubs
async function find(query = {}) {
  const { page = 1, limit = 10, sortby = "id", sortdir = "asc" } = query;
  const offset = limit * (page - 1);

  let rows = await db("hubs")
    .orderBy(sortby, sortdir)
    .limit(limit)
    .offset(offset);

  return rows;
}

// GET /hubs/7
function findById(id) {
  return db("hubs")
    .where({ id })
    .first();
}

// POST /hubs { name: 'the hub' }
async function add(hub) {
  const [id] = await db("hubs").insert(hub, "id");

  return findById(id);
}

// DELETE /hubs/3
async function remove(id) {
  const removed = await findById(id);

  await db("hubs")
    .where({ id })
    .del();

  return removed;
}

// PUT /hubs/2 { name: 'the hub' }
async function update(id, changes) { // { name: 'the corrected name }
  await db("hubs")
    .where({ id })
    .update(changes);

  return findById(id);
}
