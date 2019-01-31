import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Select from '../../Widgets/Form/Select'
import Input from '../../Widgets/Form/Input'
import FileChooser from '../../Widgets/Form/FileChooser'
import Button from '../../Widgets/Button'

export default class NodeSettingsForm extends Component {
  static propTypes = {
    onStartStop: PropTypes.func,
    checkUpdate: PropTypes.func,
    updateStatus: PropTypes.func,
    changeConfig: PropTypes.func,
    isCheckingForUpdate: PropTypes.bool,
    config: PropTypes.shape({
      host: PropTypes.string,
      port: PropTypes.number,
      dataDir: PropTypes.string,
      syncMode: PropTypes.string,
      network: PropTypes.string,
      ipc: PropTypes.string
    }),
    status: PropTypes.shape({
      client: PropTypes.string,
      binPath: PropTypes.string,
      version: PropTypes.string,
      commit: PropTypes.string,
      architecture: PropTypes.string,
      go: PropTypes.string,
      isRunning: PropTypes.bool
    }),
    options: PropTypes.shape({
      syncModes: PropTypes.arrayOf(PropTypes.string),
      versions: PropTypes.arrayOf(PropTypes.string),
      ipcOptions: PropTypes.arrayOf(PropTypes.string),
      networks: PropTypes.arrayOf(PropTypes.string)
    })
  }

  state = {
    config: this.props.config,
    status: this.props.status
  }

  componentDidUpdate(prevProps) {
    const { config, status } = this.props
    if (prevProps.config !== config) {
      this.setState({ config })
    }
    if (prevProps.status !== status) {
      this.setState({ status })
    }
  }

  handleChangeHost = event => {
    const { config } = this.state
    this.setState({ config: { ...config, host: event.target.value } })
  }

  handleChangePort = event => {
    const { config } = this.state
    this.setState({ config: { ...config, port: Number(event.target.value) } })
  }

  handleChangeDataDir = event => {
    const { config } = this.state
    this.setState({ config: { ...config, dataDir: event.target.value } })
  }

  handleChangeVersion = selectedOption => {
    const { status } = this.state
    const version = selectedOption.value
    this.setState({ status: { ...status, version } })
  }

  handleChangeSyncMode = selectedOption => {
    const { config } = this.state
    const syncMode = selectedOption.value
    this.setState({ config: { ...config, syncMode } })
  }

  handleChangeIpc = selectedOption => {
    const { config } = this.state
    const ipc = selectedOption.value
    this.setState({ config: { ...config, ipc } })
  }

  handleChangeNetwork = selectedOption => {
    const { config } = this.state
    const network = selectedOption.value
    this.setState({ config: { ...config, network } })
  }

  applyChanges() {
    const {
      updateStatus,
      changeConfig,
      config: oldConfig,
      status: oldStatus
    } = this.props
    const { config: newConfig, status: newStatus } = this.state
    if (oldConfig !== newConfig) {
      changeConfig(newConfig)
    }
    if (oldStatus !== newStatus) {
      updateStatus(newStatus)
    }
  }

  renderFooter() {
    return (
      <StyledFooter>
        <Button flat onClick={() => this.applyChanges()}>
          Apply Changes
        </Button>
      </StyledFooter>
    )
  }

  renderVersion() {
    const { options, isCheckingForUpdate, checkUpdate } = this.props
    const { status } = this.state
    const { version } = status
    const { versions } = options
    const availableVersions = versions.map(node => ({
      label: node,
      value: node
    }))
    const selectedVersion = { label: version, value: version }
    return (
      <StyledSetting>
        <StyledLabel>Version</StyledLabel>
        <StyledSelect
          value={selectedVersion}
          options={availableVersions}
          onChange={this.handleChangeVersion}
        />
        <StyledButton
          checkUpdate
          loading={isCheckingForUpdate}
          flat
          onClick={checkUpdate}
        >
          Check Update
        </StyledButton>
      </StyledSetting>
    )
  }

  renderNetwork() {
    const { options } = this.props
    const { config } = this.state
    const { networks } = options
    const { network } = config
    const availableNetworks = networks.map(node => ({
      label: node,
      value: node
    }))
    const selectedNetwork = {
      label: network,
      value: network
    }
    return (
      <StyledSetting>
        <StyledLabel>Network</StyledLabel>
        <StyledSelect
          value={selectedNetwork}
          options={availableNetworks}
          onChange={this.handleChangeNetwork}
          capitalize
        />
      </StyledSetting>
    )
  }

  renderSyncMode() {
    const { options } = this.props
    const { config } = this.state
    const { syncMode } = config
    const { syncModes } = options
    const availableSyncModes = syncModes.map(node => ({
      label: node,
      value: node
    }))
    const selectedSyncMode = {
      label: syncMode,
      value: syncMode
    }
    return (
      <StyledSetting>
        <StyledLabel>Sync Mode</StyledLabel>
        <StyledSelect
          value={selectedSyncMode}
          options={availableSyncModes}
          onChange={this.handleChangeSyncMode}
          capitalize
        />
      </StyledSetting>
    )
  }

  renderRpcHostPort() {
    const { config } = this.state
    const { host, port } = config
    return (
      <StyledSetting>
        <StyledLabel>RPC Host &amp; Port</StyledLabel>
        <StyledInput
          marginRight
          type="text"
          value={host}
          onChange={this.handleChangeHost}
        />
        <StyledInput
          type="text"
          value={port}
          onChange={this.handleChangePort}
        />
      </StyledSetting>
    )
  }

  renderDataDir() {
    const { config } = this.state
    const { dataDir } = config
    return (
      <StyledSetting>
        <StyledLabel>Data Directory</StyledLabel>
        <StyledInput
          type="text"
          value={dataDir}
          marginRight
          onChange={this.handleChangeDataDir}
        />
        <FileChooser onChange={this.handleChangeDataDir} />
      </StyledSetting>
    )
  }

  renderIpc() {
    const { options } = this.props
    const { config } = this.state
    const { ipc } = config
    const { ipcOptions } = options
    const availableIpc = ipcOptions.map(node => ({
      label: node,
      value: node
    }))
    const selectedIpc = { label: ipc, value: ipc }
    return (
      <StyledSetting>
        <StyledLabel>IPC</StyledLabel>
        <StyledSelect
          value={selectedIpc}
          options={availableIpc}
          onChange={this.handleChangeIpc}
        />
        {ipc === 'http' && (
          <StyledWarning>
            Warning: http is insecure and deprecated
          </StyledWarning>
        )}
      </StyledSetting>
    )
  }

  renderStatus() {
    const { onStartStop } = this.props
    const { status } = this.state
    const { isRunning } = status
    return (
      <StyledSetting>
        <StyledLabel>Status</StyledLabel>
        <StyledRunning isRunning={isRunning}>
          {isRunning ? 'Running' : 'Stopped'}
        </StyledRunning>
        <StyledButton startStop flat onClick={() => onStartStop(isRunning)}>
          {isRunning ? 'Stop' : 'Start'}
        </StyledButton>
      </StyledSetting>
    )
  }

  render() {
    return (
      <div>
        <StyledForm>
          {this.renderVersion()}
          {this.renderNetwork()}
          {this.renderSyncMode()}
          {this.renderRpcHostPort()}
          {this.renderDataDir()}
          {this.renderIpc()}
          {this.renderStatus()}
        </StyledForm>
        {this.renderFooter()}
      </div>
    )
  }
}

const StyledForm = styled.form`
  padding: 20px;
  border: 1px solid lightgrey;
  border-radius: 3px;
  max-width: 600px;
`

const StyledSetting = styled.div`
  margin: 0 0 20px 0;
  position: relative;
  &:last-of-type {
    margin-bottom: 0;
  }
`

const StyledLabel = styled.div`
  font-weight: bold;
  padding-bottom: 5px;
`

const StyledRunning = styled.div`
  ${props =>
    props.isRunning &&
    css`
      color: green;
    `}
  ${props =>
    !props.isRunning &&
    css`
      color: red;
    `}
`

const StyledInput = styled(Input)`
  max-width: 200px;
  ${props =>
    props.marginRight &&
    css`
      margin-right: 10px;
    `}
`

const StyledSelect = styled(Select)`
  max-width: 250px;
  ${props =>
    props.capitalize &&
    css`
      text-transform: capitalize;
    `}
`

const StyledFooter = styled.div`
  margin-top: 20px;
`

const StyledButton = styled(Button)`
  border: 1px solid #eee;
  &:hover {
    border-color: #ddd;
  }
  ${props =>
    props.checkUpdate &&
    css`
      position: absolute;
      top: 15px;
      left: 275px;
    `}
  ${props =>
    props.startStop &&
    css`
      position: absolute;
      top: 0;
      left: 100px;
    `}
`

const StyledWarning = styled.div`
  color: red;
`
