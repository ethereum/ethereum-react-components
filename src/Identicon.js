import React, { Component } from 'react'
import blockies from 'ethereum-blockies'
import { i18n } from './i18n'
import hqxConstructor from './lib/hqx'

// window.blockies = blockies

let mod = {
  Math: window.Math
}
hqxConstructor(mod)
const { hqx } = mod

// copied from https://github.com/ethereum/meteor-package-elements/blob/master/identicon.html
// see also https://github.com/ethereum/blockies/blob/master/react-component.js
// see also https://github.com/alexvandesande/meteor-identicon/blob/master/lib/identicon.js
export default class DappIdenticon extends Component {
  constructor(props) {
    super(props)
    const identity = this.props.seed.toLowerCase()
    this.state = {
      imageData: this.identiconData(identity) // cache image data
    }
  }
  // uses hqx pixel scaling with max value 4 x 2 = factor 8
  identiconData(identity) {
    return hqx(hqx(
      blockies.create({
        seed: identity,
        size: 8,
        scale: 1
      }),
      4), 4)
      .toDataURL()
  }
  // uses blockie's factor 8 scaling
  identiconDataPixel(identity) {
    return blockies
      .create({
        seed: identity,
        size: 8,
        scale: 8
      })
      .toDataURL()
  }
  renderJazzIdenticon(address) {
    // if we wrap jazzicon here we should probably lazy-load it
    // https://github.com/MetaMask/metamask-extension/blob/60feeb393be5d84679dd7b94dba58540ffa166bd/ui/lib/icon-factory.js
    return (
      <span>placeholder</span>
    )
  }
  render() {

    if (!this.props.seed) {
      return <span></span>
    }

    if (this.props.jazz) {
      return this.renderJazzIdenticon(this.props.seed)
    }

    return (
      <span title={'elements.identiconHelper'} >
        <img src={this.state.imageData} className='identicon-pixel' />
      </span>
    )
  }
}