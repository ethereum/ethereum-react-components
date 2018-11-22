import React from 'react'

import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withNotes } from '@storybook/addon-notes';

addDecorator(withNotes)

// see https://github.com/storybooks/storybook/tree/master/addons/info#options-and-defaults
addDecorator(withInfo({
  inline: true,
  header: false,
  styles: {
    info: {
      padding: '0px'
    },
    infoBody: {
      marginTop: 100,
      border: 'none',
      padding: '0px'
    }
  }
})) 

// order important: withInfo must come first
addDecorator(story => (
  <div style={{
    padding: 20
  }}
  >
    <h1 style={{
      margin: '20px 0px 0px',
      padding: '0px 0px 5px',
      color: 'rgb(68, 68, 68)',
    }}
    >
      Rendered
    </h1>
    <div style={{ borderBottom: '1px solid rgb(238, 238, 238)', backgroundColor: '#eeeeee63' }} />
    <div style={{ padding: 0, marginTop: 40 }}>
      {story()}
    </div>
  </div>
))

configure(loadStories, module);
function loadStoriesDynamically() {
  req.keys().sort().forEach(filename => req(filename));

}

function loadStories() {
  require('../src/stories/1.index.stories.jsx')
  require('../src/stories/2.createAccount.stories.jsx')
  require('../src/stories/3.sendTx.stories.jsx')
  require('../src/stories/4.txHistory.stories.jsx')
  require('../src/stories/5.wallet.stories.jsx')
  require('../src/stories/6.nodeInfo.stories.jsx')
}

configure(loadStories, module);
