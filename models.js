import Sequelize from 'sequelize'
const sequelize = new Sequelize('express', null, null, {
  dialect: 'sqlite',
  storage: `${__dirname}/db.sqlite`
})

export const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
  }
}, { timestamps: true })

export const Mailer = sequelize.define('mailer', {
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
  }
}, { timestamps: true })

export const Item = sequelize.define('item', {
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  title: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  }
}, { timestamps: true })

User.hasMany(Item)
Mailer.hasMany(Item)
Item.belongsTo(User)
Item.belongsTo(Mailer)

if (process.env.NODE_ENV !== 'production') {
  (async function initDatabase() {
    await User.sync({force: true})
    await Mailer.sync({force: true})
    await Item.sync({force: true})
    const magica = await User.create({
      username: '13222222222',
      password: 'dummydummy'
    })
    const potaty = await Mailer.create({
      username: '13000000000',
      password: 'yummyyummy'
    })
    const items = await Promise.all([
      Item.create({
        title: '[顺丰快递送温暖]30405020384',
        address: '浙江大学玉泉校区北门第三储物柜'
      }),
      Item.create({
        title: '[快开门圆通快递]11029384729',
        address: '浙江大学紫金港校区蓝田储物柜'
      })
    ])
    for (let item of items) {
      await Promise.all([
        item.setUser(magica),
        item.setMailer(potaty)
      ])
    }
  })().catch((e) => {
    console.error(e)
  });
}
