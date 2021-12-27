import React, { Component } from 'react';

import s from './Modal.module.scss';

export default class Modal extends Component {
  render() {
    return (
      <div class={s.overlay}>
        <div class={s.modal}>
          <img src="" alt="" />
        </div>
      </div>
    );
  }
}
