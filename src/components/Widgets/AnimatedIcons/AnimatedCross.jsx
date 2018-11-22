// https://codepen.io/vissuel/pen/WwmOdO

import React from 'react'
import PropTypes from 'prop-types'
import './AnimatedCross.scss'

const Cross = ({ size }) => (
  <svg
    className="cross__svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
    style={{
      width: size,
      height: size
    }}
  >
    <circle className="cross__circle" cx="26" cy="26" r="25" fill="none" />
    <path className="cross__path cross__path--right" fill="none" d="M16,16 l20,20" />
    <path className="cross__path cross__path--right" fill="none" d="M16,36 l20,-20" />
  </svg>
)

Cross.displayName = 'AnimatedCross';

Cross.propTypes = {
  size: PropTypes.number,
};

Cross.defaultProps = {
  size: 32,
};

export default Cross
