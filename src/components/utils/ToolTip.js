import React from 'react'
import { Popup } from 'semantic-ui-react'

const ToolTip = ({message, delay, itemToHover}) => (
  <Popup
    content={message}
    mouseEnterDelay={delay}
    mouseLeaveDelay={100}
    on='hover'
    trigger={itemToHover}
  />
)

export default ToolTip
