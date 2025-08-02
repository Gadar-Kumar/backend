// always use try catch to talk with database
// database is always in other continent : so use async and await
// require('dotenv').config({path:'.env'});
import dotenv from 'dotenv';
import connectDB from './db/index.js';


dotenv.config({ path: './env' });

connectDB()



















// iffi
// db connection
/*const app=express()
;(async()=>{
    try{
       await mongoose.connect(`${process.env.MONGODB_URI}/{DB_NAME}`)
       application.on("error",()=>{
              console.log('Error connecting to the database',error);
              throw error;
       })

       app.listen(process.env.PORT,()=>{
            console.log(`app is running on port ${process.env.PORT}`)
       })

    }catch(error){
        console.log('Error in IIFE:', error);

    }
})()*/

