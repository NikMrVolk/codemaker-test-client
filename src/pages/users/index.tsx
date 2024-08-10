import { useEffect, useState } from 'react'

import { Box } from '@mui/system'
import {
    DataGrid,
    GridColDef,
    GridFilterModel,
    GridPaginationModel,
    GridSortModel,
} from '@mui/x-data-grid'

import { getUsers, User, UsersResponse } from 'src/requests'

import authConfig from 'src/configs/auth'
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity'

const getColumns = (user: User): GridColDef<typeof user>[] => [
    { field: 'id', headerName: 'ID', width: 120, filterable: false },
    {
        field: 'login',
        headerName: 'Login',
        width: 150,
        editable: true,
        filterable: false,
    },
    {
        field: 'group',
        headerName: 'Group',
        width: 150,
        editable: true,
    },
    {
        field: 'status',
        headerName: 'Status',
        type: 'string',
        width: 150,
        editable: true,
    },
    {
        field: 'currency',
        headerName: 'Currency',
        type: 'string',
        width: 180,
        editable: true,
    },
    {
        field: 'balance',
        headerName: 'Balance',
        type: 'number',
        width: 150,
        editable: true,
        filterable: false,
    },
    {
        field: 'bonus_balance',
        headerName: 'Bonus balance',
        type: 'number',
        width: 220,
        editable: true,
        filterable: false,
    },
    {
        field: 'date_reg',
        headerName: 'Date reg',
        type: 'string',
        width: 200,
        editable: true,
        filterable: false,
        valueFormatter: ({ value }) => new Date(value).toLocaleString(),
    },
]

const paginationSizeOptions = [10, 25, 50, 100]

const Users = () => {
    const [sortField, setSortField] = useState<keyof User>('id')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
    const [limit, setLimit] = useState(10)
    const [skip, setSkip] = useState(0)

    const [searchGroup, setSearchGroup] = useState('')
    const [searchStatus, setSearchStatus] = useState('')
    const [searchCurrency, setSearchCurrency] = useState('')

    const [total, setTotal] = useState(0)
    const [users, setUsers] = useState<UsersResponse>([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearchUsers = () => {
        const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
        if (storedToken) {
            setIsLoading(true)
            getUsers({
                params: {
                    limit,
                    skip,
                    sortField,
                    sortDirection,
                    searchGroup,
                    searchStatus,
                    searchCurrency,
                    accessToken: storedToken,
                },
            })
                .then((response) => {
                    if (response.data && response.headers['x-total-count']) {
                        setUsers(response.data)
                        setTotal(+response.headers['x-total-count'])
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    useEffect(() => {
        handleSearchUsers()
    }, [limit, skip, sortField, sortDirection])

    useEffect(() => {
        const timer = setTimeout(() => {
            handleSearchUsers()
        }, 500)
        return () => clearTimeout(timer)
    }, [searchGroup, searchStatus, searchCurrency])

    const initialState: GridInitialStateCommunity = {
        pagination: {
            paginationModel: {
                pageSize: limit,
                page: skip / limit,
            },
        },
    }

    const onFilterModelChange = (newModel: GridFilterModel) => {
        if (newModel && newModel.items) {
            newModel.items.forEach((item) => {
                if (item.field === 'group') {
                    setSearchGroup(item.value)
                }
                if (item.field === 'status') {
                    setSearchStatus(item.value)
                }
                if (item.field === 'currency') {
                    setSearchCurrency(item.value)
                }
            })
        }
    }

    const onPaginationModelChange = (newModel: GridPaginationModel) => {
        if (newModel && newModel.pageSize) {
            setLimit(newModel.pageSize)
        }
        if (newModel && newModel.page) {
            setSkip(newModel.pageSize * newModel.page)
        }
    }

    const onSortModelChange = (newModel: GridSortModel) => {
        if (newModel && newModel[0]) {
            setSortField(newModel[0].field as keyof User)
            setSortDirection(newModel[0].sort as 'asc' | 'desc')
        }
    }

    return (
        <Box sx={{ height: 650, width: '100%' }}>
            <DataGrid
                rows={users}
                columns={getColumns(users[0])}
                initialState={initialState}
                onFilterModelChange={onFilterModelChange}
                onPaginationModelChange={onPaginationModelChange}
                onSortModelChange={onSortModelChange}
                pageSizeOptions={paginationSizeOptions}
                disableRowSelectionOnClick
                loading={isLoading}
                rowCount={total}
                filterMode="server"
                sortingMode="server"
                paginationMode="server"
            />
        </Box>
    )
}

export default Users
