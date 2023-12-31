import prisma from '../db'

// Gell all user products
export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      Product: true,
    },
  })

  res.json({ data: user })
}

// Get one product
export const getOneProduct = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.params.id,
      belongsToId: req.user.id,
    },
  })

  res.json({ data: product })
}

// Create one product
export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    })

    res.json({ data: product })
  } catch (error) {
    next(error)
  }
}

// Update one product
export const updateProduct = async (req, res) => {
  const updated = await prisma.product.update({
    where: {
      id: req.params.id,
      belongsToId: req.user.id,
    },
    data: {
      name: req.body.name,
    },
  })

  res.json({ data: updated })
}

// Delete one product
export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
  })

  res.json({ data: deleted })
}
