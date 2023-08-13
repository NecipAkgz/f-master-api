import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { createNewUser, signin } from './controls/user'
import router from './router'
import { protect } from './utils/auth'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(200)
  res.json({ message: 'Hello' })
  console.log('Main Page')
})

app.use('/api', protect, router)
app.post('/user', createNewUser)
app.post('/signin', signin)

app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).json({ message: 'unauthorized' })
  } else if (err.type === 'validation') {
    res.status(400).json({ message: 'invalid Input' })
  } else {
    res.status(500).json({ message: 'Something Broken!' })
  }
})

export default app
