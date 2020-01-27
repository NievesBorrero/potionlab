import React from 'react'

import { InlineNotification, ToastNotification } from 'carbon-components-react'

import { getMessageTypeTitle } from '../constants/MessageType'
import { INLINE } from '../constants/NotificationTypes'
import PropTypes from 'prop-types'

export const Notification = props => {
  const { message, notificationType } = props

  return (
    <>
      {notificationType === INLINE ? (
        <InlineNotification
          kind={message.type.toLowerCase()}
          title={getMessageTypeTitle(message.type)}
          subtitle={message.text}
          iconDescription="close"
          hideCloseButton={true}
        />
      ) : (
        <div className="notification-toast notification-toast--fixed">
          <ToastNotification
            kind={message.type.toLowerCase()}
            title={getMessageTypeTitle(message.type)}
            subtitle={message.text}
            iconDescription="close"
            hideCloseButton={true}
            caption=""
            timeout={5000}
          />
        </div>
      )}
    </>
  )
}

Notification.propTypes = {
  message: PropTypes.object,
  notificationType: PropTypes.string
}
