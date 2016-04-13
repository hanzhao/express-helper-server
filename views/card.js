import React from 'react'
import ReactDOM from 'react-dom'
import redux from 'redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider, connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { syncHistoryWithStore, push } from 'react-router-redux'

import store from './redux/store'

import Input from 'react-toolbox/lib/input'
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card'
import DatePicker from 'react-toolbox/lib/date_picker'
import Button from 'react-toolbox/lib/button'
import classNames from 'classnames'

import ajax from './ajax'

import styles from './cstyles'

const history = syncHistoryWithStore(browserHistory, store)

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

@connect(
  (state) => ({ }),
  (dispatch) => ({
    handleClick: () => dispatch(push('/card/add'))
  })
)
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
        <Button className={styles.iconButton} icon='add' floating accent
                onClick={this.props.handleClick} />
      </div>
    )
  }
}

@reduxForm({
  form: 'add-card',
  fields: ['no', 'name', 'date', 'cvv']
}, undefined, {
  onSubmit: (data) => {
    ajax.post('/api/user/add_card', data).then(() => {
      store.dispatch(push('/card'))
    })
    return {
      type: 'NOTHING'
    }
  }
})
class CardManager extends React.Component {
  render() {
    const {
      fields: {
        no, name, date, cvv
      },
      handleSubmit
    } = this.props
    return (
      <form>
        <Input type='text' label='信用卡卡号' {...no} />
        <Input type='text' label='开户姓名' {...name} />
        <Input type='text' label='过期时间' {...date} />
        <Input type='text' label='CVV 安全码' {...cvv} />
        <Button icon='add' label='添加信用卡' raised accent
          onClick={handleSubmit} />
      </form>
    )
  }
}

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/card" component={CardList} />
      <Route path="/card/add" component={CardManager} />
    </Router>
  </Provider>
)

ReactDOM.render(router, document.getElementById('react-root'))
