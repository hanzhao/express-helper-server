import React from 'react'
import ReactDOM from 'react-dom'
import Input from 'react-toolbox/lib/input'
import {Card, CardTitle, CardText} from 'react-toolbox/lib/card'
import Button from 'react-toolbox/lib/button'
import classNames from 'classnames'

import ajax from './ajax'

import styles from './cstyles'

function insertSpace(s) {
  let ret = ''
  for (let i = 0; i < s.length; ++i) {
    ret = ret + s[i]
    if (i % 4 === 3 && i !== s.length - 1) {
      ret = ret + ' '
    }
  }
  return ret
}

class CardList extends React.Component {
  state = {
    cards: []
  };
  componentDidMount = async () => {
    let res = await ajax.get('/api/user/card_list')
    this.setState({
      cards: res.cards
    })
  };
  render() {
    return (
      <div className={styles.container}>
        {
          this.state.cards.map((c, i) => (
            <Card key={i} raised className={classNames(styles.card, styles[`card${parseInt(Math.random() * 4)}`])}>
              <CardTitle subtitle={`信用卡 - ${c.name}`} />
              <CardText>{insertSpace(c.no)}</CardText>
            </Card>
          ))
        }
        <Button className={styles.iconButton} icon='+' floating accent mini />
      </div>
    )
  }
}

class CardManager extends React.Component {
  render() {
    return (
      <form>
        <Input type='text' label='信用卡卡号' />
        <Input type='text' label='开户姓名' />
        <Input type='text' label='过期时间' />
        <Input type='text' label='CVV 安全码' />
      </form>
    )
  }
}

ReactDOM.render(<CardList />, document.getElementById('react-root'))
