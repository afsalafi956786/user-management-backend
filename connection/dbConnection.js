import mongoose from "mongoose"

async function connectDb(data){
    try{
       mongoose.connect(data,{dbName:'userInfo'});
       console.log('database connected successfully')
    }catch(error){
        console.log(error.message)
    }
}

export default connectDb;