import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import MuiSelect from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00A4FF',
      contrastText: '#ffffff'
    }
  }
})

export default class Select extends Component {
  static displayName = 'Select'

  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func,
    options: PropTypes.array
  }

  static defaultProps = {
    options: []
  }

  constructor(props) {
    super(props)

    this.state = {
      value: props.defaultValue || '',
      labelWidth: 0
    }
  }

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    })
  }

  handleChange = e => {
    const { onChange } = this.props

    this.setState({ value: e.target.value }, () => {
      if (onChange) {
        onChange(e.target.value)
      }
    })
  }

  render() {
    const { name, id, options } = this.props
    const { labelWidth, value } = this.state

    const opts = options.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))

    return (
      <MuiThemeProvider theme={theme}>
        <FormControl variant="outlined" style={{ width: '100%' }}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref
            }}
            htmlFor={id}
          >
            {name}
          </InputLabel>
          <MuiSelect
            value={value}
            onChange={this.handleChange}
            input={
              <OutlinedInput labelWidth={labelWidth} name={name} id={id} />
            }
          >
            {opts}
          </MuiSelect>
        </FormControl>
      </MuiThemeProvider>
    )
  }
}
