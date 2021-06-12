import { Router } from 'express'
import UserRoutes from './UserRoutes'
import TokenRoutes from './TokenRoutes'


const routes = Router()

routes.use('/users', UserRoutes)
routes.use('/token', TokenRoutes)


export default routes