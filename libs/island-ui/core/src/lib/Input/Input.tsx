import React, { useState, useRef, forwardRef } from 'react'
import cn from 'classnames'
import * as styles from './Input.treat'
import { Box } from '../Box'
import Tooltip from '../Tooltip/Tooltip'

type InputBackgroundColor = 'white' | 'blue'

interface InputComponentProps {
  name: string
  value?: string | number
  id?: string
  className?: string
  disabled?: boolean
  required?: boolean
  placeholder?: string
  autoFocus?: boolean
  onFocus?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  rows?: number
}

interface InputProps extends InputComponentProps {
  label?: string
  hasError?: boolean
  errorMessage?: string
  tooltip?: string
  backgroundColor?: InputBackgroundColor
  textarea?: boolean
}

function setRefs<T>(ref: React.Ref<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(ref as any).current = value
  }
}

function useMergeRefs<ForwardRef, LocalRef extends ForwardRef>(
  forwardedRef: React.Ref<ForwardRef>,
  localRef: React.Ref<LocalRef>,
): (instance: LocalRef | null) => void {
  return React.useCallback(
    (value) => {
      setRefs(forwardedRef, value)
      setRefs(localRef, value)
    },
    [forwardedRef, localRef],
  )
}

const InputHOC = forwardRef(
  (props: InputComponentProps, ref: React.Ref<HTMLInputElement>) => (
    <input ref={ref} {...props} />
  ),
)
const TextareaHOC = forwardRef(
  (props: InputComponentProps, ref: React.Ref<HTMLTextAreaElement>) => (
    <textarea ref={ref} {...props} />
  ),
)

export const Input = forwardRef(
  (
    props: InputProps,
    ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {
      name,
      label,
      hasError = false,
      value,
      errorMessage = '',
      id = name,
      disabled,
      required,
      placeholder,
      tooltip,
      backgroundColor = 'white',
      onFocus,
      onBlur,
      textarea,
      ...inputProps
    } = props
    const [hasFocus, setHasFocus] = useState(false)
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
    const ariaError = hasError
      ? {
          'aria-invalid': true,
          'aria-describedby': id,
        }
      : {}
    const mergedRefs = useMergeRefs(inputRef, ref || null)

    const InputComponent = textarea ? TextareaHOC : InputHOC

    return (
      <div>
        <div
          className={cn(
            styles.container,
            styles.containerBackgrounds[backgroundColor],
            {
              [styles.hasError]: hasError,
              [styles.hasFocus]: hasFocus,
              [styles.containerDisabled]: disabled,
            },
          )}
          onClick={(e) => {
            e.preventDefault()
            if (inputRef.current) {
              inputRef.current.focus()
            }
          }}
        >
          <label
            htmlFor={id}
            className={cn(styles.label, {
              [styles.labelDisabledEmptyInput]: disabled && !value,
            })}
          >
            {label}
            {required && <span className={styles.isRequiredStar}> *</span>}
            {tooltip && (
              <Box marginLeft={1} display="inlineBlock">
                <Tooltip text={tooltip} />
              </Box>
            )}
          </label>
          <InputComponent
            className={cn(styles.input, {
              [styles.textarea]: textarea,
            })}
            id={id}
            disabled={disabled}
            name={name}
            ref={mergedRefs}
            placeholder={placeholder}
            value={value}
            onFocus={(e) => {
              setHasFocus(true)
              if (onFocus) {
                onFocus(e)
              }
            }}
            onBlur={(e) => {
              setHasFocus(false)
              if (onBlur) {
                onBlur(e)
              }
            }}
            {...ariaError}
            {...inputProps}
          />
        </div>
        {hasError && errorMessage && (
          <div className={styles.errorMessage} id={id}>
            {errorMessage}
          </div>
        )}
      </div>
    )
  },
)

export default Input
