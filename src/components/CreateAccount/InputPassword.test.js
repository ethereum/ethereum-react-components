import React from 'react';
import ReactDOM from 'react-dom';
import InputPassword from './InputPassword';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InputPassword />, div);
});
