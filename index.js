import express from "express"
import dotenv from "dotenv"
import mongoose, { connect } from "mongoose"
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express()
dotenv.config()

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDB")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

mongoose.connection.on("disconnected", ()=>{
    console.log("mongodb disconnected")
})

mongoose.connection.on("connected", ()=>{
    console.log("mongodb connected")
})

//MIDDLEWARES
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/auth",authRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);
app.use("/api/users",usersRoute);

app.use((err, req, res, next)=>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
})

app.listen(8800,()=>{
    // connect()
    console.log("Connected to backend!")
})