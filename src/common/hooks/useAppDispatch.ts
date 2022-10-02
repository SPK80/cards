import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../app/bll/store'

export const useAppDispatch: () => AppDispatch = useDispatch
