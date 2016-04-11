'use strict'
import React from 'react'
import { Topbar, CollapsibleNav, Nav, NavItem } from 'amazeui-react'

import style from './style'

class Header extends React.Component {
  render() {
    return (
      <Topbar brand="快递助手" toggleNavKey="nav">
        <CollapsibleNav eventKey="nav">
          <Nav topbar>
            
          </Nav>
          </CollapsibleNav>
        </Topbar>
    )
  }
}

export default Header
