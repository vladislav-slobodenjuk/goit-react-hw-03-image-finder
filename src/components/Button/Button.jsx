import React from 'react';
import s from './Button.module.scss';

export default function Button() {
  return (
    <button type="button" className={s.button}>
      Load more
    </button>
  );
}
