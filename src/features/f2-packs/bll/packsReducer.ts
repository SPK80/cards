import { RequestStatusType } from 'app/bll/appReducer'
import deckCover from 'common/assets/image/deckCover.svg'
import { dateParser } from 'common/utils/dateParser'
import { compareObj } from 'common/utils/removeEmptyObj'
import { ActionPacksType } from 'features/f2-packs/bll/packsActions'
import { PacksParamsType, PackType } from 'features/f2-packs/dal/packsAPI'

export const initialPackParams: PacksParamsType = {
  page: '1',
  pageCount: '5',
  min: '',
  max: '',
  packName: '',
  sortPacks: '',
  user_id: '',
}

const initialState = {
  packsData: {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 5,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 100,
    token: '',
    tokenDeathTime: 0,
  },
  params: initialPackParams,
  entityStatus: RequestStatusType.idle as RequestStatusType,
}

export type PacksInitialStateType = typeof initialState

export const packsReducer = (
  state: PacksInitialStateType = initialState,
  action: ActionPacksType
): PacksInitialStateType => {
  switch (action.type) {
    case 'PACKS/SET-STATUS':
      return { ...state, entityStatus: action.payload.entityStatus }
    case 'PACKS/SET-PACKS': {
      const formattedData = action.payload.packsData.cardPacks.map((c: PackType) => ({
        ...c,
        updated: dateParser(c.updated).toString(),
        deckCover: c.deckCover?.includes('data:image/jpeg;base64') ? c.deckCover : deckCover,
      }))

      return {
        ...state,
        packsData: {
          ...action.payload.packsData,
          cardPacks: formattedData,
        },
      }
    }
    case 'PACKS/SET-PAGINATION':
      return { ...state, params: { ...state.params, ...action.payload.params } }
    case 'PACKS/SET-SEARCH':
      return { ...state, params: { ...state.params, packName: action.payload.packName } }
    case 'PACKS/SET-SORT': {
      const sortRequest = `${action.payload.dir === 'asc' ? 0 : 1}${action.payload.name}`

      return { ...state, params: { ...state.params, sortPacks: sortRequest } }
    }
    case 'PACKS/SET-USER-ID':
      return { ...state, params: { ...state.params, user_id: action.payload.user_id } }
    case 'PACKS/SET-MIN-MAX':
      return {
        ...state,
        params: { ...state.params, min: action.payload.min, max: action.payload.max },
      }
    case 'PACKS/SET-INIT-PARAMS': {
      const enableChanges = compareObj(state.params, initialPackParams)

      return Object.keys(enableChanges).length
        ? {
            ...state,
            params: initialPackParams,
          }
        : state
    }
    case 'PACKS/SET-PARAMS':
      return {
        ...state,
        params: { ...state.params, ...action.payload.params },
      }
    default:
      return state
  }
}
