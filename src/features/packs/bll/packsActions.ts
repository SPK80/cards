import { PacksParamsType, PacksResponseType } from 'features/packs/dal/packsAPI'

export const getPacksAC = (packsData: PacksResponseType) =>
  ({
    type: 'PACKS/GET-PACKS',
    payload: { packsData },
  } as const)

export const setParamsAC = (params: PacksParamsType) =>
  ({
    type: 'PACKS/SET-PARAMS',
    payload: { params },
  } as const)

export type GetPacksActionType = ReturnType<typeof getPacksAC>
export type SetParamsActionType = ReturnType<typeof setParamsAC>

export type ActionPacksType = GetPacksActionType | SetParamsActionType
