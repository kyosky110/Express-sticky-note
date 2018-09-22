const express = require('express')
const fs = require('fs')
const router = express.Router()

class KLoader {
  removeString (source) {
    const packageName = 'kyo'
    const index = source.lastIndexOf(packageName)
    return source.substring(0, index - 1)
  }

  loader (path) {
    const dir = fs.readdirSync(path)
    return dir.map((filename) => {
      const module = require(path + '/' + filename)
      const ctlName = filename.split('.')[0]
      console.log('已加载: ' + ctlName)
      return { name: filename.split('.')[0], module }
    })
  }

  loadController () {
    console.log('加载controller......')
    const url = this.removeString(__dirname) + '/controller'
    return this.loader(url)
  }

  loadService () {
    console.log('加载service......')
    const url = this.removeString(__dirname) + '/service'
    return this.loader(url)
  }

  loadConfig () {
    console.log('加载config......')
    const url = this.removeString(__dirname) + '/config'
    return this.loader(url)
  }
}

class Kyo {
  loader (app) {
    this.loader = new KLoader()
    const controllers = this.loader.loadController()
    app.controller = {}
    controllers.forEach((ctl) => {
      app.controller[ctl.name] = ctl.module
    })
    // app.config = {}
    // const configs = this.loader.loadConfig()
    // configs.forEach((cfg)=> {
    //     // app.config[cfg.name] = cfg.module
    //     // app.config = { ...app.config, ...cfg.module}
    // })
  }

  setRouter (app) {
    const setRouters = (app) => {
      const routers = require('../routers')(app)
      const svc = {}
      this.loader.loadService().forEach((service) => {
        svc[service.name] = service.module
      })
      Object.keys(routers).forEach((key) => {
        const route = key.split(' ')
        let middlewares = []
        let methodValue = routers[key]
        let tempArray = []
        if (typeof methodValue === 'function') {
          tempArray.push(methodValue)
        }else if (typeof methodValue === 'object' && methodValue instanceof Array){
          tempArray = [...methodValue]
        }
        console.log(tempArray)
        tempArray.forEach((middleware)=> {
          middlewares.push(function(req, res, next){
            middleware(req, res, next, svc)
          })
        })
        console.log(`正在映射地址:${route[1]}--->HTTP Method:${route[0].toLocaleUpperCase()}--->路由方法:${routers[key].name}`)
        // router[route[0]](route[1], (req, res, next) => {
        //   const handler = routers[key]
        //   handler(req, res, next, svc)
        // })
        router[route[0]](route[1], ...middlewares)
      })
      return router
    }
    app.use(setRouters(app))
  }
}

module.exports = Kyo
