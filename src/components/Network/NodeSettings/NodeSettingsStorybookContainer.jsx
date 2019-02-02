import React, { Component } from 'react'
import NodeSettings from './NodeSettings'

export default class NodeSettingsStorybookContainer extends Component {
  state = {
    isCheckingForUpdate: false,
    status: {
      client: 'geth',
      binPath: 'F:/geth.exe',
      version: '1.8.20-stable',
      commit: '24d727b6d6e2c0cde222fa12155c4a6db5caaf2e',
      architecture: 'amd64',
      go: 'go1.11.2',
      isRunning: this.isRunning
    },
    config: {
      name: 'default',
      dataDir: 'F:/Ethereum',
      host: 'localhost',
      port: 8545,
      network: 'main',
      syncMode: 'light',
      ipc: 'rpc'
    },
    options: {
      syncModes: ['light', 'fast', 'full'],
      versions: [
        '1.8.20-stable',
        '1.8.10-stable',
        '1.7.0-stable',
        '1.6.0-stable'
      ],
      ipcOptions: ['http', 'rpc'],
      networks: ['main', 'ropsten', 'rinkeby', 'kovan']
    }
  }

  updateStatus = status => {
    this.setState({ status })
    console.log('New status: ', status)
  }

  changeConfig = config => {
    this.setState({ config })
    console.log('New config: ', config)
  }

  checkUpdate = () => {
    this.setState({ isCheckingForUpdate: true }, () => {
      setTimeout(() => {
        this.setState({ isCheckingForUpdate: false })
      }, 2000)
    })
  }

  handleStartStop = isRunning => {
    const { status } = this.state
    this.setState({
      status: {
        ...status,
        isRunning: !isRunning
      }
    })
  }

  render() {
    const { status, config, options, isCheckingForUpdate } = this.state
    return (
      <NodeSettings
        status={status}
        config={config}
        options={options}
        updateStatus={this.updateStatus}
        changeConfig={this.changeConfig}
        onStartStop={this.handleStartStop}
        isCheckingForUpdate={isCheckingForUpdate}
        checkUpdate={this.checkUpdate}
      />
    )
  }
}
