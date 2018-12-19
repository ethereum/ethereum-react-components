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
            &#8220;{executionFunctionClean}&#8221; function
          </React.Fragment>
        ) : (
          <React.Fragment>contract function</React.Fragment>
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
