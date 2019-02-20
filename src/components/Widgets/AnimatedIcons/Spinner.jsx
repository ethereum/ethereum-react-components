import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00A4FF'
    },
    secondary: {
      main: '#ffffff'
    }
  }
})

export default class Spinner extends Component {
  static displayName = 'Spinner'

  static propTypes = {
    color: PropTypes.oneOf(['primary', 'secondary']),
    size: PropTypes.number
  }

  static defaultProps = {
    color: 'primary',
    size: 40
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CircularProgress {...this.props} />
      </MuiThemeProvider>
    )
  }
}
