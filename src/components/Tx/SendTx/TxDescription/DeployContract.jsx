import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default class DeployContract extends Component {
  static displayName = 'DeployContract'

  static propTypes = {
    data: PropTypes.string
  }

  render() {
    const { data } = this.props

    const bytesCount = encodeURI(data).split(/%..|./).length - 1

    return (
      <StyledWrapper>
        <div>
          <Bold>Upload</Bold> New Contract
        </div>
        <StyledSubtext className="context-description__subtext">
          About {bytesCount} bytes
        </StyledSubtext>
      </StyledWrapper>
    )
  }
}

const StyledWrapper = styled.div`
  margin: 18px 0 24px;
  font-size: 36px;
  text-align: left;
`

const StyledSubtext = styled.div`
  font-size: 16px;
  margin: 12px 0;
`

const Bold = styled.span`
  font-weight: bold;
`
