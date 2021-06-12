import { Token } from "../entity/Token"


export default ({ id, user_id, refresh_token, expires, created_by_ip }: Token): object => ({
    id, 
    user_id, 
    refresh_token, 
    expires, 
    created_by_ip 
})