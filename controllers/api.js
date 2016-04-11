'use strict'

import Promise from 'bluebird'
import fs from 'fs'
Promise.promisifyAll(fs)

import { Router } from 'express'
const router = Router()

router.post('/sign_in', (req, res) => {
  if (req.body.username !== '13221834123') {
    res.json({
      code: 0
    })
  } else {
    res.json({
      code: -1
    })
  }
})

router.get('*', (req, res) => {
  res.status(404).json({
    code: -1,
    error: 'Not found'
  })
})

export default router
