export default interface ErrorResponse {
    error: string
};

export function isErrorResponse(object: any): object is ErrorResponse {
    return 'error' in object;
}