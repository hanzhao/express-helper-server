'use strict'
import React from 'react'
import { Slider, Button } from 'amazeui-react'

import goout from './goout.jpg'
import bigthing from './bigthing.jpg'
import noperson from './noperson.jpg'
import bath from './bath.jpg'

import styles from './styles'

class MainPage extends React.Component {
  state = {
    content: ""
  };
  componentDidMount = () => {
    let length = 1;
    setInterval(() => {
      if (length <= 11) {
        length += 1
      } else {
        length = 1
      }
      if (length < 7) {
        this.setState({
          content: "下载收货助手".slice(0, length)
        })
      }
    }, 450)
  };
  render() {
    return (
      <Slider theme="a5">
        <Slider.Item>
          <img src={goout} />
          <Button amStyle="danger" className={styles.animateButton1}>
            {this.state.content}
          </Button>
        </Slider.Item>
        <Slider.Item>
          <img src={bigthing} />
          <Button amStyle="secondary" className={styles.animateButton2}>
            {this.state.content}
          </Button>
        </Slider.Item>
        <Slider.Item>
          <img src={noperson} />
          <Button amStyle="warning" className={styles.animateButton3}>
            {this.state.content}
          </Button>
        </Slider.Item>
        <Slider.Item>
          <img src={bath} />
          <Button amStyle="success" className={styles.animateButton4}>
            {this.state.content}
          </Button>
        </Slider.Item>
      </Slider>
    )
  }
}

export default MainPage
