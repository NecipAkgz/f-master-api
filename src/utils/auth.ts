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
  // Extract the authorization header from the request
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
    // Verify the token using the JWT_SECRET from environment variables
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // Assign the payload to the req.user property for future use
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
