import { Dispatch } from "react"

type FetchFuncType = (...args: any[]) => Promise<any>;

export const loadingWrap = async (setIsLoading: Dispatch<boolean>, fetchFunc: FetchFuncType, fetchFuncArgs: any[]): Promise<void> => {
    setIsLoading(true)
    await fetchFunc(...fetchFuncArgs)
    setIsLoading(false)
}
