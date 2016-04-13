'use strict'
import React from 'react'
import { Slider, Button } from 'amazeui-react'
import classNames from 'classnames'

import goout from './goout.png'
import noperson from './noperson.png'
import sad from './sad.png'
import work from './work.png'

import styles from './styles'

function adjustSliderHeight() {
  [].forEach.call(document.getElementsByClassName(styles.page), (e) => {
    e.style.height = `${window.innerHeight - 64 * 1.2}px`
  })
}

class MainPage extends React.Component {
  componentDidMount = () => {
    window.addEventListener('resize', adjustSliderHeight)
    setTimeout(adjustSliderHeight, 1)
  };
  render() {
    return (
      <Slider>
        <Slider.Item>
          <div className={classNames(styles.page, styles.page1)}>
            <div className={styles.description}>
              出门在外，担心拿不到快递？
            </div>
            <Button amStyle="danger" className={styles.animateButton}>
              下载收货助手
            </Button>
            <img src={goout} className={classNames(styles.image, styles.image1)} />
          </div>
        </Slider.Item>
        <Slider.Item>
          <div className={classNames(styles.page, styles.page2)}>
            <div className={styles.description}>
              平时工作忙，还能放肆网购吗？
            </div>
            <Button amStyle="warning" className={styles.animateButton}>
              下载收货助手
            </Button>
            <img src={work} className={classNames(styles.image, styles.image2)} />
          </div>
        </Slider.Item>
        <Slider.Item>
          <div className={classNames(styles.page, styles.page3)}>
            <div className={styles.description}>
              客户老不在家，业绩老上不去怎么办？
            </div>
            <Button amStyle="default" className={styles.animateButton}>
              下载送货助手
            </Button>
            <img src={noperson} className={classNames(styles.image, styles.image3)} />
          </div>
        </Slider.Item>
        <Slider.Item>
          <div className={classNames(styles.page, styles.page4)}>
            <div className={styles.description}>
              物业不靠谱，快递员真难当！
            </div>
            <Button amStyle="success" className={styles.animateButton}>
              下载收货助手
            </Button>
            <img src={sad} className={classNames(styles.image, styles.image4)} />
          </div>
        </Slider.Item>
      </Slider>
    )
  }
}

export default MainPage