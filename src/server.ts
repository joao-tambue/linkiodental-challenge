import dotenv from 'dotenv'
import connectDB from './config/db'
import app from './app'

dotenv.config()

connectDB()

const PORT = 4000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})