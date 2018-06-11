import React from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import style from './layout.css';

const Layout = (props) => (
  <div className={style.layout}>
    <Header />
    <div>{props.children}</div>
    <Footer />
  </div>
);
export default Layout;
