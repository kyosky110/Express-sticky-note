const getIndex = async (req, res, next, svc) => {
  await svc.indexService.getIndex()
  var data;
  if(req.session.user){
    data = {
      isLogin: true,
      user: req.session.user
    }
  }else{
    data = {
      isLogin: false
    }
  }
  console.log('user')
  console.log(req.session.user)
  res.render('index', data)
}

const getIndex2 = (req, res, next, svc) => {
  res.render('index', { title: 'Express2' })
}

module.exports = {
  getIndex,
  getIndex2
}
