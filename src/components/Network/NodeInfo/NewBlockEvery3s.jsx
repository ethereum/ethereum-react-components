import React, { Component } from 'react'

class NewBlockEvery3s extends Component {
  constructor(props) {
    super(props)

    this.state = {
      props
    }
  }
  componentDidMount() {
    let intervalId = setInterval(this.timer.bind(this), 3000)
    this.setState({ intervalId })
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }
  timer() {
    const oldProps = this.state.props
    let newProps = {
      ...oldProps,
      remote: {
        ...oldProps,
        blockNumber: oldProps.remote.blockNumber + 1,
        timestamp: Date.now()
      },
      local: {
        ...oldProps.local,
        blockNumber: oldProps.remote.blockNumber + 1,
        timestamp: Date.now()
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

export default NewBlockEvery3s
