
const Note = require('../models/note')

const getNotes = async (req, res, next, svc) => {
  console.log('getNotes')
  // await svc.indexService.getIndex()
  // res.render('index', { title: 'Express' })
  var opts = { raw: true }
  if (req.session && req.session.user) {
    opts.where = { username: req.session.user.username }
  }
  Note.findAll(opts).then(function (notes) {
    console.log(notes)
    res.send({ status: 0, data: notes });
  }).catch(function () {
    res.send({ status: 1, errorMsg: '数据库异常' });
  });
}

const addNotes = async (req, res, next, svc) => {
  //   console.log({text: note, username: username})
  if (!req.session || !req.session.user) {
    return res.send({ status: 1, errorMsg: '请先登录' })
  }
  if (!req.body.note) {
    return res.send({ status: 2, errorMsg: '内容不能为空' });
  }
  var note = req.body.note;
  var username = req.session.user.username;
  Note.create({ text: note, username: username }).then(function () {
    console.log(arguments)
    res.send({ status: 0 })
  }).catch(function () {
    res.send({ status: 1, errorMsg: '数据库异常或者你没有权限' });
  })
}

const editNotes = async (req, res, next, svc) => {
  if(!req.session || !req.session.user){
    return res.send({status: 1, errorMsg: '请先登录'})
  }
  var noteId = req.body.id;
  var note = req.body.note;
    var username = req.session.user.username;
  Note.update({ text: note, username: username }, { where: { id: noteId } }).then(function (lists) {
    if (lists[0] === 0) {
      return res.send({ status: 1, errorMsg: '你没有权限' });
    }
    res.send({ status: 0 })
  }).catch(function (e) {
    res.send({ status: 1, errorMsg: '数据库异常或者你没有权限' });
  })
}

const deleteNotes = async (req, res, next, svc) => {
  if(!req.session || !req.session.user){
    return res.send({status: 1, errorMsg: '请先登录'})
  }
  var noteId = req.body.id
  var username = req.session.user.username;

  Note.destroy({ where: { id: noteId, username: username } }).then(function (deleteLen) {
    if (deleteLen === 0) {
      return res.send({ status: 1, errorMsg: '你没有权限' });
    }
    res.send({ status: 0 })
  }).catch(function (e) {
    res.send({ status: 1, errorMsg: '数据库异常或者你没有权限' });
  })
}

module.exports = {
  getNotes,
  addNotes,
  editNotes,
  deleteNotes
}