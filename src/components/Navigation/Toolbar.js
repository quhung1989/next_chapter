import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../Logo/Logo'
import NavigationItems from './NavigationItems'
import DrawerToggle from './SideDrawer/DrawerToggle'

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.toggleDrawer} />
      <div className={classes.Logo} onClick={props.logoClicked}>
        <Logo/>
      </div>
      <ul className={classes.DesktopOnly}>
        <NavigationItems
          profileClicked={props.profileClicked}
          toggleModal={props.toggleModal}
          toggleDrawer={props.toggleDrawer}/>
      </ul>
    </header>
  )
}

export default toolbar