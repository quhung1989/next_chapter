import React from 'react';
import classes from './DropDown.module.css'
import NavigationItem from '../Navigation/NavigationItem'

const dropDown = (props) => {
  let dropDownList
  let optionsArray = []

  for (let key in props.options) {
    optionsArray.push({
      id: key,
      title: props.options[key].title,
      props: props.options[key].props,
    })
  }

  if (props.showDrawer && !props.show) {
    dropDownList = null
  } else {
    dropDownList = (
      optionsArray.map(ele => {
        let onClick
        let link

        if (props.showDrawer) {
          onClick = () => props.onClickFunc()
          if (ele.props.onClick) {
            onClick = () => props.onClickFunc(ele.props.onClick)
          }
        } else {
          onClick = ele.props.onClick
        }

        if (ele.props.link) {
          link = ele.props.link
        }
        
        return (
          <NavigationItem
            key={ele.id}
            onClick={onClick}
            link={link}
          >
            {ele.title}
          </NavigationItem>
        )
      })
    )
  }

  return (
    <div className={classes.Container}>
      <div className={classes.List}>
        <div onClick={props.toggleDropDown} className={classes.Title}>
          {props.username}
        </div>
        <div className={classes.ListItem}>
          {dropDownList}
        </div>
      </div>
    </div>
  );
};

export default dropDown;