import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createJWT = (user: any) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET
  )
  return token
}

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash)
}

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5)
}

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer) {
    res.status(401)
    res.send('Not authorized')
    return
  }

  const [, token] = bearer.split(' ')
  if (!token) {
    res.status(401)
    res.send('Not authorized')
    return
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload
    console.log(payload)
    next()
    return
  } catch (error) {
    console.error(error)
    res.status(401)
    res.send('Not valid jwt')
    return
  }
}
