'use strict'

import Promise from 'bluebird'
import fs from 'fs'
Promise.promisifyAll(fs)

import { Router } from 'express'
const router = Router()

import { User, Mailer, Item } from '../models'

router.post('/user/sign_in', async (req, res) => {
  let username = req.body.username
  let password = req.body.password
  if (!(/^\d{11}$/.test(username))) {
    return res.json({ code: -1, error: '用户名必须为手机号码' })
  }
  try {
    let [user, created] = await User.findOrCreate({
      where: {
        username, password
      }
    })
    req.session.user = user.id
    return res.json({ code: 0, username: user.username, created })
  } catch (e) {
    return res.json({ code: -1, error: '用户名或密码错误' })
  }
})

router.get('/user/item_list', async (req, res) => {
  if (!req.session.user) {
    return res.json({ code: -1, error: '用户未登录' })
  }
  try {
    let user = await User.findById(req.session.user)
    let items = await user.getItems({
      order: 'item.id DESC',
      include: [{
        model: Mailer, attributes: ['username']
      }]
    })
    return res.json({ code: 0, items })
  } catch (e) {
    console.error(e)
    return res.json({ code: -1, error: '用户信息错误' })
  }
})

router.post('/user/check_item', async (req, res) => {
  if (!req.session.user || !req.body.item_id) {
    return res.json({ code: -1, error: '用户未登录' })
  }
  try {
    let item = await Item.findById(req.body.item_id)
    if (item.userId === req.session.user) {
      item.status = 1
      await item.save()
      return res.json({ code: 0 })
    } else {
      return res.json({ code: -1, error: '用户不是快递持有者' })
    }
  } catch (e) {
    return res.json({ code: -1, error: '快递不存在或数据库错误' })
  }
})

router.post('/mailer/sign_in', async (req, res) => {
  let username = req.body.username
  let password = req.body.password
  if (!(/^\d{11}$/.test(username))) {
    return res.json({ code: -1, error: '用户名必须是手机号' })
  }
  try {
    let [user, created] = await Mailer.findOrCreate({
      where: {
        username, password
      }
    })
    req.session.mailer = user.id
    return res.json({ code: 0, username: user.username, created })
  } catch (e) {
    return res.json({ code: -1, error: '用户名或密码错误' })
  }
})

router.post('/mailer/add_item', async (req, res) => {
  if (!req.session.mailer) {
    return res.json({ code: -1, error: '用户未登录'})
  }
  try {
    let user = await User.findOne({
      where: {
        username: req.body.username
      }
    })
    let mailer = await Mailer.findById(req.session.mailer)
    let item = await Item.create({
      title: req.body.title,
      address: req.body.address,
    })
    await Promise.all([item.setUser(user), item.setMailer(mailer)])
    return res.json({ code: 0, item })
  } catch (e) {
    return res.json({ code: -1, error: '请求错误' })
  }
})

router.get('/mailer/item_list', async (req, res) => {
  if (!req.session.mailer) {
    return res.json({ code: -1, error: '用户未登录' })
  }
  try {
    let mailer = await Mailer.findById(req.session.mailer)
    let items = await mailer.getItems({
      order: 'item.id DESC',
      include: [{
        model: User, attributes: ['username']
      }]
    })
    return res.json({ code: 0, items })
  } catch (e) {
    return res.json({ code: -1, error: '用户信息错误' })
  }
})

router.get('*', (req, res) => {
  res.status(404).json({
    code: -1,
    error: 'Not found'
  })
})

export default router
