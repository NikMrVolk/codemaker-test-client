import { $api } from 'src/configs/axios'
import { AxiosRequestConfig } from '..'

export enum Currency {
    RUB = 'RUB',
    USD = 'USD',
    EUR = 'EUR',
}

export type User = {
    id: number
    login: string
    group: number
    status: number
    currency: Currency
    balance: number
    bonus_balance: number
    date_reg: string
}
export type UsersResponse = User[]

export interface GetUsersParams {
    sortField: keyof User
    sortDirection: 'asc' | 'desc'
    searchGroup: string
    searchStatus: string
    searchCurrency: string
    limit: number
    skip: number
    accessToken: string
}

export type GetUsersConfig = AxiosRequestConfig<GetUsersParams>

export const getUsers = async ({ params, config }: GetUsersConfig) =>
    $api.get<UsersResponse>(`/users`, { ...config, params: { ...params } })
