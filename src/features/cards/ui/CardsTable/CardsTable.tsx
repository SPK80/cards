import React, { PropsWithChildren, ReactElement, useMemo } from 'react'

import { Skeleton, TableHead, TableSortLabel, Tooltip } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { Column, TableOptions, TableState, useFlexLayout, useTable } from 'react-table'

import { RequestStatusType } from 'app/bll/appReducer'
import { sortDir } from 'common/enums/enums'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useStyles } from 'common/styles/PacksTableStyles'
import { deletePackTC } from 'features/packs/bll/packsThunks'

export interface TableProps<T extends Record<string, unknown>> extends TableOptions<T> {
  name: string
  columnSort: (e: string) => void
  initialState?: Partial<TableState<T>>
  entityStatus: RequestStatusType
  sortDirection: string | null
  sortParam: string | undefined
  profileId: string | null
}

export const CardsTable = <T extends Record<string, unknown>>(
  props: PropsWithChildren<TableProps<T>>
): ReactElement => {
  const dispatch = useAppDispatch()

  const { classes } = useStyles()

  const {
    columns,
    initialState = {},
    sortDirection,
    columnSort,
    entityStatus,
    sortParam,
    profileId,
  } = props

  const defaultColumn = useMemo<Partial<Column<T>>>(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 250,
    }),
    []
  )

  const instance = useTable<T>(
    {
      ...props,
      columns,
      defaultColumn,
      initialState,
    },
    useFlexLayout
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, data } = instance

  const { role: tableRole, ...tableProps } = getTableProps()
  const { role: tableBodyRole, ...tableBodyProps } = getTableBodyProps()

  return (
    <TableContainer component={Paper}>
      <Table role={tableRole} {...tableProps}>
        <TableHead>
          {headerGroups.map(headerGroup => {
            const { key: headerGroupKey, ...getHeaderGroupProps } = headerGroup.getHeaderGroupProps(
              { className: classes.tableHead }
            )

            return (
              <TableRow key={headerGroupKey} {...getHeaderGroupProps}>
                {headerGroup.headers.map(column => {
                  const { key: headerKey, ...getHeaderProps } = column.getHeaderProps()

                  return (
                    <TableCell key={headerKey} {...getHeaderProps}>
                      {column.defaultCanSort ? (
                        <Tooltip title={column.render('Header')}>
                          <TableSortLabel
                            direction={
                              sortParam?.includes(column.id) && sortDirection === sortDir.desc
                                ? 'desc'
                                : 'asc'
                            }
                            onClick={() => columnSort(column.id)}
                          >
                            {column.render('Header')}
                          </TableSortLabel>
                        </Tooltip>
                      ) : (
                        column.render('Header')
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableHead>
        <TableBody {...tableBodyProps}>
          {rows.map(row => {
            prepareRow(row)
            const { key: rowKey, ...getRowProps } = row.getRowProps()

            return (
              <TableRow key={rowKey} {...getRowProps}>
                {row.cells.map(cell => {
                  const { key: cellKey, ...getCellProps } = cell.getCellProps({
                    className: classes.tableBodyCell,
                  })

                  // const enableEdit = data[cell.row.index]?.user_id === profileId
                  // const disableStudyBtn = !data[cell.row.index]?.cardsCount
                  //
                  // const startStudyingActionHandler = (packId: string) => {}
                  // const editPackActionHandler = (packId: string) => {}
                  // const deletePackActionHandler = (packId: string) => dispatch(deletePackTC(packId))

                  return (
                    <TableCell key={cellKey} {...getCellProps}>
                      {entityStatus === RequestStatusType.loading ? (
                        <Skeleton className={classes.tableBodyCellSkeleton} />
                      ) : (
                        cell.render('Cell')
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
