import React from 'react'
import Button from './Button'
import { Spinner } from './LoadingAnimations'

const LoadingButton = ({ children, onClick, loading }) => (
  <Button onClick={onClick}>
    {loading && <Spinner style={{ float: 'left' }} />}
    <div style={{ float: 'right' }}>{children}</div>
  </Button>
)

export default LoadingButton
