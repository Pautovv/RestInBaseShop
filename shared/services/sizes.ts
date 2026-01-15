import { ApiRoutes } from "./constants"
import { axiosInstance } from "./instance"

export const getAll = async (): Promise<string[]> => {
    return (await axiosInstance.get<string[]>(ApiRoutes.SIZES)).data
}