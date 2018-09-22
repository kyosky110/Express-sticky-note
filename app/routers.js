module.exports = (app) => {
  return {
    'get /': app.controller.index.getIndex,
    'get /users': app.controller.user.getUser,
    'get /api/notes': app.controller.notes.getNotes,
    'post /api/notes/add': app.controller.notes.addNotes,
    'post /api/notes/edit': app.controller.notes.editNotes,
    'post /api/notes/delete': app.controller.notes.deleteNotes,
    'get /auth/github': app.controller.auth.github,
    'get /auth/github/callback': [app.controller.auth.githubCallback,app.controller.auth.githubCallbackSuccess],
    'get /auth/logout': app.controller.auth.logout
  }
}
