import type { exampleResponse, exampleType } from '../types/types'
import { httpService } from './axios.config'

export const exampleService = {
    examle: (data: exampleType) =>
        httpService.post<exampleResponse>('/abs', data).then(res => res.data)
}