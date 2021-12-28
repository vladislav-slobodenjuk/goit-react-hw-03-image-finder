import React, { Component } from 'react';

import s from './Modal.module.scss';

export default class Modal extends Component {
  render() {
    const { src, alt } = this.props;
    return (
      <div className={s.overlay}>
        <div className={s.modal}>
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}
