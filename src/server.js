
import express from 'express'
import { CONECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import exitHook from 'async-exit-hook'

import { env } from '~/config/environment'
const START_SERVER = () => {

  const app = express()

  // const hostname = 'localhost'
  // const port = 8017

  app.get('/', async (req, res) => {
  // Test Absolute import mapOrder

    console.log(process.env)
    // process.exit(0)
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
  // eslint-disable-next-line no-console
    console.log(`3 Hello ${env.AUTHOR}, I am running at ${ env.APP_HOST }:${ env.APP_PORT }/`)
  })
  exitHook((done) => {
    console.log(' 4 Exit app')
    CLOSE_DB()
    console.log(' 5 Exit app')
    done()
  })
  // exitHook((done) => {
  //   console.log('4 Exit app')
  //   CLOSE_DB().then(() => {
  //     console.log('5 Exit app') // chờ CLOSE_DB xong mới log
  //     done() // rồi mới báo xong
  //   })
  // })
}
//chỉ kết nối db thành công thì mới start server backend
//sytax là "IIFE" gọi fun ngay lập tức đọc thêm từ docs
(async () => {
  try {
    console.log('1 Connecting to MongoDB Clould Atlas...')
    await CONECT_DB()
    console.log('2 Connected to MongoDB Clould Atlas!')
    ////khởi động server backend sau khi connect databasse thành công
    START_SERVER()

  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()
// console.log('1 Connecting to MongoDB Clould Atlas...')
// CONECT_DB()
//   .then(() => console.log('2 Connected to MongoDB Clould Atlas!'))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.error(error)
//     process.exit(0)
//   })


// START_SERVER()
