const service = require("./comments.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function commentExists(req, res, next) {
  const { commentId } = req.params;
  const comment = await service.read(commentId);
  if (comment) {
    res.locals.comment = comment;
    return next();
  }
  return next({ status: 404, message: `Comment cannot be found.` });
}

async function list(req, res, next) {
  const getAllComments = await service.list();
  res.json({ data: getAllComments });
}


//NEED CLARITY ON NUMBER() METHOD!
async function listCommenterCount(req, res, next) {
  const totalComments = await service.listCommenterCount();
  const userCount = totalComments.map(user => {
      return {
        commenter_email: user.commenter_email,
        count: Number(user.count),
      };
  })
  res.json({ data: userCount });
}

async function read(req, res, next) {
  const knexInstance = req.app.get("db");
  const { comment } = res.locals;
  res.json({ data: comment });
}

module.exports = {
  list: asyncErrorBoundary(list),
  listCommenterCount: asyncErrorBoundary(listCommenterCount),
  read: [asyncErrorBoundary(commentExists), read],
};
