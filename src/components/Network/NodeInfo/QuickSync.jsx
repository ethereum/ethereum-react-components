import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class QuickSync extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  constructor(props) {
    super(props)

    this.state = {
      props
    }
  }

  componentDidMount() {
    const intervalId = setInterval(this.timer.bind(this), 250)
    this.setState({ intervalId })
  }

  componentWillUnmount() {
    const { intervalId } = this.state
    clearInterval(intervalId)
  }

  timer() {
    const { props, intervalId } = this.state
    const oldProps = props
    let { active } = oldProps

    let newBlock = oldProps.local.sync.currentBlock + 2500
    if (newBlock > oldProps.local.sync.highestBlock) {
      newBlock = oldProps.local.sync.highestBlock
      active = 'local'
      clearInterval(intervalId)
    }

    const newProps = {
      ...oldProps,
      active,
      local: {
        ...oldProps.local,
        blockNumber: newBlock,
        timestamp: moment().unix(),
        sync: {
          ...oldProps.local.sync,
          currentBlock: newBlock
        }
      }
    }

    this.setState({ props: newProps })
  }

  render() {
    if (!this.state) {
      return null
    }
    const { children } = this.props
    const { props } = this.state
    return <div>{React.cloneElement(children, props)}</div>
  }
}
