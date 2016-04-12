'use strict'
import React from 'react'
import AppBar from 'react-toolbox/lib/app_bar'

import style from './style'

class Header extends React.Component {
  render() {
    return (
      <AppBar fixed flat>
        <a>快递助手</a>
      </AppBar>
    )
  }
}

export default Header
