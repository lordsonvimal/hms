// @flow

import React from 'react';

type Props = {
  children: Object,
  onClose: Function,
  onSubmit: Function,
  title?: string
};

export default function Modal({ children, onClose, onSubmit, title }: Props) {
  return (
    <div className="modal modal--center">
      <div className="modal__content modal__content--medium">
        <div className="modal__header">
          <span className="modal__title">{title}</span>
        </div>
        <div className="modal__body">
          {children}
        </div>
        <div className="modal__footer">
          <button className="btn btn--full" onClick={onSubmit}>Submit</button>
        </div>
        <div className="modal__close" onClick={onClose}><i className="fas fa-times"/></div>
      </div>
    </div>
  );
}
