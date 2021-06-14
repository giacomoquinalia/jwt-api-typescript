export interface IRefreshTokenRequestDTO {
    id?: string
    user_id?: string
    refresh_token: string
    expires: Date
    ip_address?: string
    created_by_ip?: string
}