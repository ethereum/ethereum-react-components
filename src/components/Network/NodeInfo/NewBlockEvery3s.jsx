import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class NewBlockEvery3s extends Component {
  static displayName = 'NewBlockEvery3s'

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
    const intervalId = setInterval(this.timer.bind(this), 3000)
    this.setState({ intervalId })
  }

  componentWillUnmount() {
    const { intervalId } = this.state
    clearInterval(intervalId)
  }

  timer() {
    const { props } = this.state
    const oldProps = props

    const newProps = {
      ...oldProps,
      remote: {
        ...oldProps,
        blockNumber: oldProps.remote.blockNumber + 1,
        timestamp: moment().unix()
      },
      local: {
        ...oldProps.local,
        blockNumber: oldProps.local.blockNumber + 1,
        timestamp: moment().unix()
      }
    }

    this.setState({ props: newProps })
  }

  render() {
    const { children } = this.props
    const { props } = this.state

    if (!this.state) {
      return null
    }

    return <div>{React.cloneElement(children, props)}</div>
  }
}

export default NewBlockEvery3s
