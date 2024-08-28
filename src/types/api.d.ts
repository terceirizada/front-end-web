export type APIRequest<T> = {
    data: {
        data: T
    }
}

export type APIResponse<T> = {
    data: T
}