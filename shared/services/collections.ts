import { Collection } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getAll = async (): Promise<Collection[]> => {
    return (await axiosInstance.get<Collection[]>(ApiRoutes.COLLECTIONS)).data
}