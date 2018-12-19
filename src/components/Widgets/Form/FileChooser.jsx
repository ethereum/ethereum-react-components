import React from 'react'

const FileChooser = ({ children, onClick }) => (
  <input type="file" className="input-field input-file" />
)

FileChooser.displayName = 'FileChooser'

export default FileChooser
