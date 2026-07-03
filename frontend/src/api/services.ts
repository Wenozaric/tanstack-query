import type { exampleResponse } from '../types/types'
import { httpService } from './axios.config'

export const exampleService = {
    fetchData: () =>
        httpService.get<exampleResponse>('/data').then(res => res.data)
}