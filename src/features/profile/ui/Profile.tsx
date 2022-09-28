import React from 'react'

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { useNavigate } from 'react-router-dom'

import { EditableSpan } from './EditableSpan'
import s from './profile.module.css'

import { SIGN_IN } from 'app/ui/RoutesComponent'
import userPhoto from 'common/assets/image/user.png'
import { ContentWrapper } from 'common/components/contentWrapper/ContentWrapper'
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks'
import { logoutTC } from 'features/auth/bll/authThunks'
import { updateProfileType } from 'features/profile/bll/profileActions'
import { updateProfileTitleTC } from 'features/profile/bll/profileThunks'

type PropsType = {}

export const Profile: React.FC<PropsType> = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(state => state.profile)

  console.log(profile)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const navigate = useNavigate()
  const onClickHandler = () => {
    dispatch(logoutTC())
  }

  const user: updateProfileType = {
    name: null,
  }
  const onTitleChangeHandler = (value: string) => {
    user.name = value
    dispatch(updateProfileTitleTC(user))
  }

  if (!isLoggedIn) {
    navigate(SIGN_IN)
  }

  return (
    <ContentWrapper>
      <Typography variant="h4" style={{ marginBottom: '30px' }}>
        Profile
      </Typography>
      <div style={{ position: 'relative' }}>
        <img src={profile.avatar || userPhoto} alt={'user'} className={s.photo} />
        <div className={s.iconPhoto}>
          <IconButton>
            <AddAPhotoIcon />
          </IconButton>
        </div>
      </div>
      <div style={{ paddingTop: '30px', paddingBottom: '30px' }}>
        <Typography variant={'h5'}>
          <EditableSpan value={profile.name || 'Some Name'} onChange={onTitleChangeHandler} />
        </Typography>
      </div>
      <Typography variant="h6" style={{ marginBottom: '30px' }}>
        {profile.email}
      </Typography>
      <Button
        style={{ width: '100%', marginBottom: '31px', borderRadius: '20px' }}
        variant="contained"
        onClick={onClickHandler}
      >
        Log out
      </Button>
    </ContentWrapper>
  )
}
