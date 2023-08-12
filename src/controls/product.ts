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
    },
  })

  res.json({ data: product })
}
