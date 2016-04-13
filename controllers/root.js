import { Router } from 'express'

const router = Router()

router.get('/card', (req, res) => {
  res.sendFile(`${ROOT}/public/card.html`)
})

router.get('*', (req, res) => {
  res.sendFile(`${ROOT}/public/index.html`)
})

export default router
