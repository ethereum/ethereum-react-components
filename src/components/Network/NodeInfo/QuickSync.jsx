import React, { Component } from 'react'
import moment from 'moment'

class QuickSync extends Component {
  constructor(props) {
    super(props)

    this.state = {
      props
    }
  }

  componentDidMount() {
    let intervalId = setInterval(this.timer.bind(this), 250)
    this.setState({ intervalId })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  timer() {
    const oldProps = this.state.props

    let newBlock = oldProps.local.sync.currentBlock + 250
    if (newBlock > oldProps.local.sync.highestBlock) {
      newBlock = oldProps.local.sync.highestBlock
      clearInterval(this.state.intervalId)
    }

    let newProps = {
      ...oldProps,
      local: {
        ...oldProps.local,
        blockNumber: oldProps.local.blockNumber + 1,
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
      return
    }
    return (
      <div>{React.cloneElement(this.props.children, this.state.props)}</div>
    )
  }
}

export default QuickSync
