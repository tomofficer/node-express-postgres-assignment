const knex = require("../db/connection");

function create(post) {
  return knex("posts")
    .insert(post)
    .returning("*")
    .then(res => res[0]);
}

function read(postId) {
  return knex("posts").select("*").where({ post_id: postId }).first();
}

//NEED SOME HELP CLARIFYING HERE!!
function update(updatedPost) {
  return knex("posts")
    .where({ post_id: updatedPost.post_id })
    .update(updatedPost, "*")
    .select("*")
    .then(res => res[0]);
}


function destroy(postId) {
  return knex("posts")
    .where({ post_id: postId })
    .del();
}

module.exports = {
  create,
  read,
  update,
  delete: destroy,
};
