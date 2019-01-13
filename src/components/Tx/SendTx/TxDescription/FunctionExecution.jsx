import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { formatFunctionName } from '../../../../util/formatters'

export default class FunctionExecution extends Component {
  static displayName = 'FunctionExecution'

  static propTypes = {
    executionFunction: PropTypes.string
  }

  static defaultProps = {
    executionFunction: ''
  }

  render() {
    const { executionFunction } = this.props

    const executionFunctionClean = formatFunctionName(executionFunction)

    return (
      <StyledWrapper>
        <Bold>Execute </Bold>
        {executionFunctionClean ? (
          <React.Fragment>
            &#8220;
            <StyledFunctionName>{executionFunctionClean}</StyledFunctionName>
            &#8221; Function
          </React.Fragment>
        ) : (
          <React.Fragment>Contract Function</React.Fragment>
        )}
      </StyledWrapper>
    )
  }
}

const StyledWrapper = styled.div`
  margin: 18px 0 24px;
  font-size: 36px;
  text-align: left;
`

const Bold = styled.span`
  font-weight: bold;
`

const StyledFunctionName = styled.span`
  text-transform: capitalize;
`
