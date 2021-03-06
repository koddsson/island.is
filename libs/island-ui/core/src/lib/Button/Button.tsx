import React, { forwardRef, ReactNode, FC, useContext } from 'react'
import cn from 'classnames'
import { Box } from '../Box'
import { Inline } from '../Inline/Inline'
import { IconTypes, Icon as IconComponent } from '../Icon/Icon'
import { ColorSchemeContext } from '../context'

import * as styles from './Button.treat'

export type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonVariant = 'normal' | 'ghost' | 'text' | 'menu'
export type ButtonWidth = 'normal' | 'fluid' | 'fixed'

export interface ButtonProps {
  disabled?: boolean
  onClick?:
    | ((
        event: React.MouseEvent<
          HTMLButtonElement | HTMLAnchorElement,
          MouseEvent
        >,
      ) => void)
    | undefined
  variant?: ButtonVariant
  size?: ButtonSize
  width?: ButtonWidth
  href?: string
  htmlType?: 'button' | 'submit'
  icon?: IconTypes
  children?: ReactNode
  loading?: boolean
  leftIcon?: IconTypes
  leftImage?: string
  noWrap?: boolean
  target?: string
  white?: boolean
  tabIndex?: number
}

const isLinkExternal = (href: string): boolean => href.indexOf('://') > 0

export const Button = forwardRef<
  HTMLAnchorElement & HTMLButtonElement,
  ButtonProps
>(
  (
    {
      children,
      onClick,
      disabled,
      htmlType = 'button',
      variant = 'normal',
      size = 'medium',
      width = 'normal',
      href,
      icon,
      loading,
      leftImage,
      leftIcon,
      noWrap,
      target = '_blank',
      white,
      tabIndex,
    },
    ref,
  ) => {
    const { colorScheme } = useContext(ColorSchemeContext)

    const className = cn(
      styles.button,
      styles.variants[variant],
      styles.sizes[size],
      styles.width[width],
      {
        [styles.noWrap]: noWrap,
        [styles.white]: colorScheme === 'white' || white,
      },
    )

    const isExternal = !!(href && isLinkExternal(href))
    const isMenuButton = variant === 'menu'
    const hasLeftContent = !!(leftImage || leftIcon)
    const showRightIcon = !!(icon || isExternal || loading)

    const anchorProps = {
      ...(isExternal && { rel: 'noreferrer noopener', target }),
    }

    const sharedProps = {
      tabIndex,
      className,
      onClick,
    }

    const buttonContent = {
      leftImage,
      isMenuButton,
      hasLeftContent,
      children,
      icon,
      leftIcon,
      showRightIcon,
      loading,
      isExternal,
    }

    return href ? (
      <a ref={ref} href={href} role="button" {...anchorProps} {...sharedProps}>
        <ButtonContent {...buttonContent} />
      </a>
    ) : (
      <button ref={ref} type={htmlType} disabled={disabled} {...sharedProps}>
        <ButtonContent {...buttonContent} />
      </button>
    )
  },
)

const Icon = ({
  showRightIcon,
  icon,
  loading,
  isExternal,
}: {
  showRightIcon: boolean
  icon: IconTypes
  loading: boolean
  isExternal: boolean
}) => {
  if (!showRightIcon) {
    return null
  }

  const type = loading ? 'loading' : isExternal ? 'external' : icon

  const iconProps = {
    spin: loading,
    width: 15,
    type,
  }

  return (
    <IconContainer>
      <IconComponent {...iconProps} />
    </IconContainer>
  )
}

const LeftImage = ({ leftImage }: { leftImage: string }) =>
  leftImage ? (
    <div
      style={{
        backgroundImage: `url(${leftImage})`,
      }}
      className={styles.image}
    />
  ) : null

const LeftIcon = ({ leftIcon }: { leftIcon: IconTypes }) =>
  leftIcon ? <IconComponent type={leftIcon} /> : null

interface ButtonContentProps {
  leftImage?: string
  isMenuButton: boolean
  hasLeftContent: boolean
  icon?: IconTypes
  leftIcon?: IconTypes
  showRightIcon: boolean
  loading?: boolean
  isExternal?: boolean
}

const ButtonContent: FC<ButtonContentProps> = ({
  leftImage,
  isMenuButton,
  hasLeftContent,
  children,
  icon,
  leftIcon,
  showRightIcon,
  loading,
  isExternal,
}) => {
  return (
    <Inline alignY="center" space={2}>
      {isMenuButton && hasLeftContent ? (
        <LeftContentContainer>
          {leftImage ? (
            <LeftImage leftImage={leftImage} />
          ) : leftIcon ? (
            <LeftIcon leftIcon={leftIcon} />
          ) : null}
        </LeftContentContainer>
      ) : leftIcon ? (
        <LeftIcon leftIcon={leftIcon} />
      ) : null}
      {children ? children : null}
      {icon ? (
        <Icon
          showRightIcon={showRightIcon}
          icon={icon}
          loading={!!loading}
          isExternal={!!isExternal}
        />
      ) : null}
    </Inline>
  )
}

const IconContainer: FC = ({ children }) => (
  <Box display="flex" height="full" alignItems="center">
    {children}
  </Box>
)

const LeftContentContainer: FC = ({ children }) => {
  return (
    <>
      <Box display="inlineBlock" className={styles.leftSpacer} />
      <Box
        position="absolute"
        display="flex"
        left={0}
        top={0}
        bottom={0}
        alignItems="center"
        justifyContent="center"
        className={styles.leftContentContainer}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="circle"
          overflow="hidden"
          className={styles.leftContent}
        >
          {children}
        </Box>
      </Box>
    </>
  )
}
