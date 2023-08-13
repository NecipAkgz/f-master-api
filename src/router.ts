import { Router } from 'express'
import { body } from 'express-validator'
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from './controls/product'
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from './controls/updates'
import { handleInputErrors } from './utils/middleware'

const router: Router = Router()

/* -------------------------------- /Product -------------------------------- */

router.get('/product', getProducts)

router.get('/product/:id', getOneProduct)

router.post(
  '/product',
  body('name').isString(),
  handleInputErrors,
  createProduct
)

router.put(
  '/product/:id',
  body('name').isString(),
  handleInputErrors,
  updateProduct
)

router.delete('/product/:id', deleteProduct)

/* --------------------------------- Update --------------------------------- */

router.get('/update', getUpdates)

router.get('/update/:id', getOneUpdate)

router.post(
  '/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  createUpdate
)

router.put(
  '/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
  body('version').optional(),
  updateUpdate
)

router.delete('/update/:id', deleteUpdate)

/* ------------------------------- UpdatePoint ------------------------------ */

router.get('/updatepoint', (req, res) => {})

router.get('/updatepoint/:id', (req, res) => {})

router.post(
  '/updatepoint',
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  (req, res) => {}
)

router.put(
  '/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  (req, res) => {}
)

router.delete('/updatepoint/:id', (req, res) => {})

export default router
