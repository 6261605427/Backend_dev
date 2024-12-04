const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const { userRoute } = require('./Routes/UserRoutes')

app.use('/api', userRoute)

app.listen(5000, () => {
    console.log("Server is running on 5000")
})