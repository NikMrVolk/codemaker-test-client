import axios, { CreateAxiosDefaults } from 'axios'
import { getContentType } from './helpers'

const axiosOptions: CreateAxiosDefaults = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: getContentType(),
    withCredentials: true,
}

export const $api = axios.create(axiosOptions)
