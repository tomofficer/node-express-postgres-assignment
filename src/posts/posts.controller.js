const service = require("./posts.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function postExists(req, res, next) {
  const { postId } = req.params;

  const post = await service.read(postId);
  if (post) {
    res.locals.post = post;
    return next();
  }
  return next({ status: 404, message: `Post cannot be found.` });
}

async function create(req, res) {
  const newPost = req.body.data;
  const addNewPost = await service.create(newPost);
  res.json({ data: addNewPost });
}


async function update(req, res) {
  const updateThisPost = req.body.data;
  const updatedPost = await service.update(updateThisPost)
  res.json({ data: updatedPost });
}

//NEED CLARITY ON THIS ONE TOO... why do i need to return json data on a delete path?
async function destroy(req, res) {
  const { postId } = req.params;
  const deletedPost = await service.delete(postId);
  res.status(204).json({ data: deletedPost });
}

module.exports = {
  create: asyncErrorBoundary(create),
  update: [asyncErrorBoundary(postExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(postExists), asyncErrorBoundary(destroy)],
};
