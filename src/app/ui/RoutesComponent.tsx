import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { PageNotFound } from 'common/components/PageNotFound/PageNotFound'
import { CheckEmail } from 'features/auth/ui/CheckEmail'
import { NewPassword } from 'features/auth/ui/NewPassword'
import { Recovery } from 'features/auth/ui/Recovery'
import { SignIn } from 'features/auth/ui/SignIn'
import { SignUp } from 'features/auth/ui/SignUp'
import { Profile } from 'features/profile/ui/Profile'

export const PROFILE = '/profile'
export const SIGN_IN = '/login'
export const SIGN_UP = '/registration'
export const REC_PASSWORD = '/forgot'
export const CHECK_EMAIL = '/checkEmail'
export const NEW_PASSWORD = '/set-new-password/:token'
export const Page_Not_Found = '*'

export const RoutesComponent: React.FC = () => {
  const routes = [
    { path: PROFILE, component: <Profile /> },
    { path: SIGN_IN, component: <SignIn /> },
    { path: SIGN_UP, component: <SignUp /> },
    { path: REC_PASSWORD, component: <Recovery /> },
    { path: Page_Not_Found, component: <PageNotFound /> },
    { path: CHECK_EMAIL, component: <CheckEmail /> },
    { path: NEW_PASSWORD, component: <NewPassword /> },
  ]

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Navigate to={SIGN_IN} />} />
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </>
  )
}
