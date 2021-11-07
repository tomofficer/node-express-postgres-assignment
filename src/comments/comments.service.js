const knex = require("../db/connection");

function list() {
  return knex("comments").select("*")
}


//
function listCommenterCount() {
  return knex("comments")
    .join("users", "comments.commenter_id", "users.user_id")
    .count("comment_id")
    .select("users.user_email as commenter_email")
    .groupBy("commenter_email")
    .orderBy("commenter_email");
}

//need clarity on the triple join and the first() method!! 
function read(commentId) {
  return knex("comments")
    .join("users", "users.user_id", "comments.commenter_id")
    .join("posts", "posts.post_id", "comments.post_id")
    .where({ comment_id: commentId})
    .select(
      "comments.comment_id",
      "comments.comment",
      "users.user_email as commenter_email",
      "posts.post_body as commented_post"
    )
   .first();
}

module.exports = {
  list,
  listCommenterCount,
  read,
};
