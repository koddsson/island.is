import React, { FC, useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../../auth/utils'
import useUserInfo from '../../hooks/useUserInfo/useUserInfo'
import Cookies from 'js-cookie'
import { MOCK_AUTH_KEY } from '@island.is/service-portal/constants'

export interface AuthenticatorProps {
  something?: string
}

export const Authenticator: FC<AuthenticatorProps> = ({
  children,
  ...rest
}) => {
  const {isAuthenticated, refreshUser, userInfoState} = useUserInfo();
  const refreshToken = Cookies.get(MOCK_AUTH_KEY);
  useEffect(() => {
    if(!isAuthenticated && refreshToken) {
      refreshUser();
    }
  }, [])

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          refreshToken ?
          <h1>LOADING</h1> :
          <Redirect
            to={{ pathname: '/innskraning', state: { from: location } }}
          />
        )
      }
    />
  )
}

export default Authenticator
