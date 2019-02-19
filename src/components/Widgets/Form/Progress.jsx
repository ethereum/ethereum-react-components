import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LinearProgress from '@material-ui/core/LinearProgress'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00A4FF'
    }
  }
})

export default class Progress extends Component {
  static displayName = 'Progress'

  static propTypes = {
    variant: PropTypes.oneOf([
      'determinate',
      'indeterminate',
      'buffer',
      'query'
    ])
  }

  static defaultProps = {
    variant: 'determinate'
  }

  render() {
    const { variant } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <LinearProgress {...this.props} variant={variant} />
      </MuiThemeProvider>
    )
  }
}
