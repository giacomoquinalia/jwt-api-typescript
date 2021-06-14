import { RefreshToken } from "../entity/RefreshToken"


export default ({ id, user_id, refresh_token, expires, created_by_ip }: RefreshToken): object => ({
    id, 
    user_id, 
    refresh_token, 
    expires,
    created_by_ip 
})