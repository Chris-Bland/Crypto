import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const Loading = ({ children }) => (
  <div className='flexes flex-column justify-center align-center loading'>
    <CircularProgress />
  </div>
)

export default Loading
