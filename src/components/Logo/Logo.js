import React from 'react';
import classes from './Logo.module.css';
import nextChapterLogo from '../../assets/next-chapter-logo.png'

const logo = props => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={nextChapterLogo} alt="NextChapter" />
  </div>
);

export default logo;
