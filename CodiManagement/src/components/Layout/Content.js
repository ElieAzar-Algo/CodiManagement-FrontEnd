import React from 'react';
import bg from '../../assets/img/bg/background_1920-7.png';

import bn from 'utils/bemnames';

import { Container } from 'reactstrap';

const bem = bn.create('content');

const Content = ({ tag: Tag, className, ...restProps }) => {
  const classes = bem.b(className);

  return <Tag  className={classes} {...restProps} />;
};

Content.defaultProps = {
  tag: Container,
};

export default Content;
