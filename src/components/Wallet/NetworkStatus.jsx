import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClock,
  faLayerGroup,
  faUsers
} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

export default class NetworkStatus extends Component {
  static displayName = 'NetworkStatus'

  static propTypes = {
    peers: PropTypes.number,
    blockNumber: PropTypes.string,
    timestamp: PropTypes.string
  }

  static defaultProps = {
    peers: 0,
    blockNumber: '-'
  }

  constructor(props) {
    super(props)

    this.state = {
      diffTimestamp: props.timestamp
    }
  }

  componentDidMount() {
    this.diffInterval = setInterval(() => {
      this.setState({ diffTimestamp: moment().unix() })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.diffInterval)
  }

  renderTimestamp() {
    const { timestamp } = this.props

    if (!timestamp) {
      return '-'
    }

    const { diffTimestamp } = this.state
    const diff = moment
      .unix(diffTimestamp)
      .diff(moment.unix(timestamp), 'seconds')

    return diff < 120
      ? `${diff}s since last block`
      : `${Math.floor(diff / 60)}m since last block`
  }

  render() {
    const { peers, blockNumber } = this.props

    return (
      <StyledWrapper {...this.props}>
        <StyledRow>
          <StyledIcon icon={faUsers} /> {peers || '-'} peers
        </StyledRow>
        <StyledRow>
          <StyledIcon icon={faLayerGroup} /> {blockNumber}
        </StyledRow>
        <StyledRow>
          <StyledIcon icon={faClock} /> {this.renderTimestamp()}
        </StyledRow>
      </StyledWrapper>
    )
  }
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: rgba(130, 122, 122, 0.7);
  font-size: 0.75em;
  padding: 0px 32px;
`

const StyledRow = styled.div`
  margin: 2px 0;
`

const StyledIcon = styled(FontAwesomeIcon)`
  display: inline-block;
  width: 24px !important;
`
