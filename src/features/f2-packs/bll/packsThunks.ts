import { initialPackParams } from './packsReducer'

import { RequestStatusType } from 'app/bll/appReducer'
import { AppThunk } from 'app/bll/store'
import { errorUtils } from 'common/utils/error-utils'
import { compareObj } from 'common/utils/removeEmptyObj'
import { setPacksAC, setPacksStatusAC } from 'features/f2-packs/bll/packsActions'
import {
  AddPackDataType,
  packsAPI,
  PacksParamsType,
  UpdatePackDataType,
} from 'features/f2-packs/dal/packsAPI'

export const getPacksTC = (): AppThunk => async (dispatch, getState) => {
  //compareObj - сравнивает 2 объекта, если свойства первого отличаются от 2-го, то возвращается объект с измененными свойствами
  const params: PacksParamsType = compareObj(getState().packs.params, initialPackParams)

  dispatch(setPacksStatusAC(RequestStatusType.loading))

  try {
    const res = await packsAPI.getPacks(params)

    dispatch(setPacksAC(res.data))
  } catch (error: any) {
    errorUtils(error, dispatch)
  } finally {
    dispatch(setPacksStatusAC(RequestStatusType.succeeded))
  }
}

export const addPackTC = (data: AddPackDataType): AppThunk => {
  return async dispatch => {
    dispatch(setPacksStatusAC(RequestStatusType.loading))
    try {
      const res = await packsAPI.addPack(data)

      dispatch(getPacksTC())
    } catch (error: any) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setPacksStatusAC(RequestStatusType.succeeded))
    }
  }
}

export const deletePackTC = (idPack: string): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(setPacksStatusAC(RequestStatusType.loading))
    const fromCards = getState().cards.params.cardsPack_id

    try {
      const res = await packsAPI.deletePack(idPack)

      !fromCards && dispatch(getPacksTC())
    } catch (error: any) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setPacksStatusAC(RequestStatusType.succeeded))
    }
  }
}

export const updatePackTC = (data: UpdatePackDataType): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(setPacksStatusAC(RequestStatusType.loading))
    const fromCards = getState().cards.params.cardsPack_id

    try {
      const res = await packsAPI.updatePack({ cardsPack: data })

      !fromCards && dispatch(getPacksTC())
    } catch (error: any) {
      errorUtils(error, dispatch)
    } finally {
      dispatch(setPacksStatusAC(RequestStatusType.succeeded))
    }
  }
}