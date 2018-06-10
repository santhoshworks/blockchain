import React from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';


const Layout = (props) => (
  <div>
    <Header />
    <div>{props.children}</div>
    <Footer />
  </div>
);
export default Layout;
