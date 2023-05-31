import { connect } from "./service/mongo"
import express from 'express'
import cors from 'cors'
import { allRoutes } from "./routes/Routes"
import cookieParser from 'cookie-parser'

connect()

const app = express()
const options:cors.CorsOptions = {
origin:true,
credentials:true,
}
app.use(cors(options))
app.get("/hello", (req,res) => {
    res.send("Healthy route")
})
app.use(express.json())
app.use(cookieParser())
app.use(allRoutes)

app.listen(process.env.PORT || 3000, () => {
    console.log('Escutando porta ')
})
