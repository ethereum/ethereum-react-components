module.exports = {
  cacheDirectory: '.cache/jest',
  clearMocks: true,
  // https://github.com/facebook/jest/issues/3094#issuecomment-385164816
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': "identity-obj-proxy",
  },
  coverageDirectory: 'coverage'
}