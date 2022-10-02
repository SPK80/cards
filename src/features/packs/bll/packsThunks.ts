import { setAppInfoAC, setAppStatusAC } from 'app/bll/appActions'
import { RequestStatusType } from 'app/bll/appReducer'
import { AppThunk } from 'app/bll/store'
import { errorUtils } from 'common/utils/error-utils'
import { getPacksAC, setPacksParamsAC } from 'features/packs/bll/packsActions'
import {
  AddPackDataType,
  packsAPI,
  PacksParamsType,
  UpdatePackDataType,
} from 'features/packs/dal/packsAPI'

export const getPacksTC =
  (params?: PacksParamsType): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setAppStatusAC(RequestStatusType.loading))
    //TODO проверить params, по моему вместо packsOptions надо передавать напрямую params с аргументов фунцкии
    if (params) {
      await dispatch(setPacksParamsAC(params))
    }
    const packsOptions = getState().packs.params

    try {
      const res = await packsAPI.getPacks(packsOptions)

      dispatch(getPacksAC(res.data))
      dispatch(setAppInfoAC('Packs received successfully'))
      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }

export const addPackTC = (data: AddPackDataType): AppThunk => {
  return async dispatch => {
    dispatch(setAppStatusAC(RequestStatusType.loading))
    try {
      const res = await packsAPI.addPack(data)

      dispatch(getPacksTC())
      dispatch(setAppInfoAC('Pack added successfully'))
      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }
}

export const deletePackTC = (idPack: string): AppThunk => {
  return async dispatch => {
    dispatch(setAppStatusAC(RequestStatusType.loading))
    try {
      const res = await packsAPI.deletePack(idPack)

      dispatch(getPacksTC())
      dispatch(setAppInfoAC('Pack deleted successfully'))
      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }
}

export const updatePackTC = (data: UpdatePackDataType): AppThunk => {
  return async dispatch => {
    dispatch(setAppStatusAC(RequestStatusType.loading))
    try {
      const res = await packsAPI.updatePack(data)

      dispatch(getPacksTC())
      dispatch(setAppInfoAC('Pack updated successfully'))
      dispatch(setAppStatusAC(RequestStatusType.succeeded))
    } catch (error: any) {
      errorUtils(error, dispatch)
    }
  }
}