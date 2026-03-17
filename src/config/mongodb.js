/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

//hoanbaodev
//a0iLeJChxAza1IoY

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'


//tạo đối tượng instance ban đầu là null vì chưa connect
let trelloDatabaseInstance = null

//khởi tạo đối tượng kết Instance để kết nối Mongodb
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  //serverApi có từ phiển bản 5.0.0 trở lên ,ko cần dùng nó cx được
  // serverApi: {
  //   version: ServerApiVersion.v1,
  //   strict: true,
  //   deprecationErrors: true
  // }
})

//kết nối tới database
export const CONECT_DB = async () => {
  //gọi kết nối với mongoDB atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect()

  //kết nối thành công thì lấy  db theo tên gán ngược lên biến trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

//đảm bảo luôn gọi getdb khi db kết nối thành công
export const GET_DB = () => {
  //chưa kết nối thì null
  if (!trelloDatabaseInstance)
    throw new Error('Hãy kết nỗi đến CSDL trước!')
  return trelloDatabaseInstance
}

export const CLOSE_DB = async () => {
  console.log('code chay vao close')
  await mongoClientInstance.close()
}
