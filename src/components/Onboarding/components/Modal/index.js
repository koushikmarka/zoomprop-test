import useEventListener from './../../hooks/use-event-listener'
import { ModalContainer } from './styles'
import { updateUser } from '@/services/user'
import CloseIcon from '@mui/icons-material/Close'
import { Button } from '@mui/material'
import { useTheme } from '@mui/system'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'

/**
 * The modal component of the onboarding flow
 * @param {object} props Component props
 * @param {bool} props.intro value to determine intro step
 * @param {number} props.index the position of the modal in the onboarding flow story object
 * @param {function} props.setIndex function to set the value of the index
 * @param {string} props.className css class for the modal
 * @param {number} props.maxLength the total number of steps in the onboarding flow
 * @param {bool} props.isVisible value used to toggle the component's visibility
 * @param {function} props.onClose function to close the component
 * @returns {JSX.Element} Component template
 */
const Modal = ({
  intro,
  index,
  setIndex,
  className,
  maxLength,
  isVisible,
  onClose,
  user,
  ...props
}) => {
  const theme = useTheme()
  console.log('this is the user', user)
  const isInRange = (x) => {
    const min = 0
    const max = maxLength - 1
    return x >= min && x <= max
  }

  const prev = () => {
    if (isInRange(index - 1)) {
      setIndex(index - 1)
    } else {
      onCloseAndReset(false)
    }
  }

  const next = () => {
    if (isInRange(index + 1)) {
      setIndex(index + 1)
    } else {
      onCloseAndReset(true)
    }
  }

  const onCloseAndReset = (dontShowAgain) => {
    onClose()
    setIndex(0)
    if (dontShowAgain) {
      updateUser(user?.authToken, { assist: 'false', email: user?.email })
    }
  }

  var overlays = document.getElementsByTagName('section')
  for (let overlay of overlays) {
    document.body.removeChild(overlay)
  }

  const checkKey = useCallback((e) => {
    e = e || window.event
    const { keyCode } = e
    if ([38, 39].includes(keyCode)) {
      // up and right arrow
      next()
    } else if ([40, 37].includes(keyCode)) {
      // down and left arrow
      prev()
    } else if (keyCode === 27) {
      // escape key
      onCloseAndReset()
    }
  })

  // Add event listener for keydown
  useEventListener('keydown', checkKey)

  return (
    <ModalContainer theme={theme}>
      <div className={`${className} modal-pane ${isVisible && 'show-modal'}`}>
        <div className="modal-content">
          <div className="modal-header fixed-top">
            <h4 />
            <CloseIcon sx={{ mt: 2 }} onClick={onClose} />
          </div>
          <div className="modal-body">
            {props.children}
            {intro ? (
              <div className="align-center">
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: theme.palette.success.main,
                    color: theme.palette.common.black,
                    borderRadius: '0px !important',
                    '&:hover': {
                      bgcolor: theme.palette.success.main,
                      color: theme.palette.common.black,
                      opacity: 0.8,
                    },
                  }}
                  onClick={next}
                >
                  Start quick tour
                </Button>
                <Button
                  variant="outline"
                  sx={{
                    border: 'none',
                    textDecoration: 'underline',
                    fontSize: '12px !important',
                  }}
                  onClick={() => onCloseAndReset(true)}
                >
                  Don't show me again
                </Button>
              </div>
            ) : index === maxLength - 1 ? (
              <div className="align-center">
                <button className="button-secondary" onClick={prev}>
                  previous
                </button>
                <button className="button-primary" onClick={onCloseAndReset}>
                  End Tour
                </button>
              </div>
            ) : (
              <div className="align-center">
                <button className="button-secondary" onClick={prev}>
                  previous
                </button>
                <button className="button-primary" onClick={next}>
                  next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

Modal.propTypes = {
  intro: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  setIndex: PropTypes.func.isRequired,
  className: PropTypes.string,
  maxLength: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

Modal.defaultProps = {
  isVisible: false,
}

export default Modal
