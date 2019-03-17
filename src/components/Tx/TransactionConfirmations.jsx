import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TransactionConfirmations extends Component {
  static displayName = 'TransactionConfirmations'

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
    const confirmations = setInterval(this.timer.bind(this), 2000)
    this.setState({ confirmations })
  }

  componentWillUnmount() {
    const { confirmations } = this.state
    clearInterval(confirmations)
  }

  timer() {
    const { props } = this.state
    const oldProps = props
    let { confirmations } = this.state
    confirmations += 1

    const newProps = {
      ...oldProps,
      confirmations,
      transaction: {
        ...oldProps.transaction,
        confirmationNumber: oldProps.confirmations % 12
      }
    }

    this.setState({ confirmations }, this.setState({ props: newProps }))
  }

  render() {
    const { children } = this.props
    const { props } = this.state

    if (!this.state) {
      return null
    }

    return (
      <React.Fragment>{React.cloneElement(children, props)}</React.Fragment>
    )
  }
}
