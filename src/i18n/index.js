
const CreateAccountForm = {
  'mist.popupWindows.requestAccount.enterPassword': 'enter password',
  'mist.popupWindows.requestAccount.repeatPassword': 'repeat password',
  'mist.popupWindows.importAccount.buttons.showPassword': 'show password',
  'mist.popupWindows.requestAccount.creating': 'Creating Account ...',
  'mist.popupWindows.requestAccount.title': 'Create Account',
  'buttons.ok': 'ok',
  'buttons.cancel': 'cancel',
};

const lang = {
  ...CreateAccountForm,
};

const i18n = {
  t: k => (lang[k] ? lang[k] : k),
};

export default i18n;
