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

export const Card  = sequelize.define('card', {
  no: {
    type: Sequelize.STRING
  },
  cvv: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.STRING
  }
})

User.hasMany(Item)
User.hasMany(Card)
Mailer.hasMany(Item)
Card.belongsTo(User)
Item.belongsTo(User)
Item.belongsTo(Mailer)

if (process.env.NODE_ENV !== 'production') {
  (async function initDatabase() {
    await User.sync({force: true})
    await Mailer.sync({force: true})
    await Item.sync({force: true})
    await Card.sync({force: true})
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
    const cards = await Promise.all([
      Card.create({
        no: '6310450322344212352',
        cvv: 1342,
        name: 'Magica Lin',
        date: '12/22/2022'
      }),
      Card.create({
        no: '5324341928483510294',
        cvv: 3952,
        name: 'Magica Lin',
        date: '03/19/2022'
      })
    ])
    for (let card of cards) {
      await card.setUser(magica)
    }
  })().catch((e) => {
    console.error(e)
  });
}
