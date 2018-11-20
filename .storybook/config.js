import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo);

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
