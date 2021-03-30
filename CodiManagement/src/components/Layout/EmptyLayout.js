import { Content } from 'components/Layout';
import React from 'react';
import bg from '../../assets/img/bg/background_1920-7.png';

const EmptyLayout = ({ children, ...restProps }) => (
  <main
  //  style={{backgroundImage:"url("+bg+")",backgroundRepeat:"no-repeat"}} 
   className="cr-app bg-light" {...restProps}>
    <Content fluid>{children}</Content>
  </main>
);

export default EmptyLayout;
