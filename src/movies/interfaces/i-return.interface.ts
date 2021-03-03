export interface IReturn {
    msg: string,
    status: number,
    data: any,
    code: 'OK' | 'KO',
    validRequest: boolean
}
