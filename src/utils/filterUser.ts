import { User } from "../entity/User"


export default ({ id, name, email, company }: User): object => ({
    id,
    name,
    email,
    company
})