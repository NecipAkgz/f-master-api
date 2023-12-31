import prisma from '../db'
import { comparePasswords, createJWT, hashPassword } from '../utils/auth'

export const createNewUser = async (req, res, next) => {
  const hash = await hashPassword(req.body.password)

  const checkUser = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  })

  if (checkUser) {
    res.status(400)
    res.json({ message: 'User already exists' })
    return
  }

  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hash,
      },
    })

    const token = createJWT(user)
    res.json({ token })
  } catch (error) {
    error.type = 'input'
    next(error)
  }
}

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  })

  const isValid = await comparePasswords(req.body.password, user.password)

  if (!isValid) {
    res.status(401)
    res.json({ message: 'Invalid credentials' })
    return
  }

  const token = createJWT(user)
  res.json({ token })
}
