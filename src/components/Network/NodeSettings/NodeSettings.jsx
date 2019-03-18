import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import NodeSettingsForm from './NodeSettingsForm'

export default class NodeSettings extends Component {
  static propTypes = {
    isCheckingForUpdate: PropTypes.bool,
    status: PropTypes.shape({
      client: PropTypes.string,
      binPath: PropTypes.string,
      version: PropTypes.string,
      commit: PropTypes.string,
      architecture: PropTypes.string,
      go: PropTypes.string,
      isRunning: PropTypes.bool
    }),
    config: PropTypes.shape({
      name: PropTypes.string,
      dataDir: PropTypes.string,
      host: PropTypes.string,
      port: PropTypes.number,
      network: PropTypes.string
    }),
    options: PropTypes.shape({
      syncModes: PropTypes.arrayOf(PropTypes.string),
      versions: PropTypes.arrayOf(PropTypes.string),
      ipcOptions: PropTypes.arrayOf(PropTypes.string),
      networks: PropTypes.arrayOf(PropTypes.string)
    }),
    updateStatus: PropTypes.func,
    changeConfig: PropTypes.func,
    checkUpdate: PropTypes.func,
    onStartStop: PropTypes.func
  }

  render() {
    const {
      status,
      config,
      options,
      isCheckingForUpdate,
      checkUpdate,
      onStartStop,
      changeConfig,
      updateStatus
    } = this.props
    const { binPath, client } = status

    return (
      <div>
        <StyledH1>Node Settings</StyledH1>
        <StyledH3>
          Client: <StyledValue>{client}</StyledValue>
        </StyledH3>
        <StyledH3>
          Path: <StyledValue>{binPath}</StyledValue>
        </StyledH3>

        <NodeSettingsForm
          config={config}
          status={status}
          options={options}
          onStartStop={onStartStop}
          changeConfig={changeConfig}
          updateStatus={updateStatus}
          isCheckingForUpdate={isCheckingForUpdate}
          checkUpdate={checkUpdate}
        />
      </div>
    )
  }
}

const StyledH1 = styled.h1`
  margin: 0 0 10px 0;
`

const StyledH3 = styled.h3`
  font-weight: normal;
  margin: 0 0 10px 0;
`

const StyledValue = styled.span`
  font-weight: bold;
`
