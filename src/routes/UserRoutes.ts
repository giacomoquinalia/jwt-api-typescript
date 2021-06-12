import { Router } from 'express'
import validateRequest from '../middlewares/RequestValidator/Users'
import isAuthenticated from '../middlewares/JWTAuthentication'
import { createUserController } from '../useCases/User/CreateUser'
import { authenticateUserController } from '../useCases/User/AuthenticateUser'
import { deleteUserController } from '../useCases/User/DeleteUser'
import { findUserController } from '../useCases/User/FindUser'
import { updateUserController } from '../useCases/User/UpdateUser'

const UserRoutes = Router()

UserRoutes
    .get(
        '/:id', 
        isAuthenticated, 
        validateRequest('findById'),
        findUserController.handle
    )
    .post(
        '/authenticate',
        validateRequest('authenticate'), 
        authenticateUserController.handle
    )
    .post(
        '/:id',
        isAuthenticated,
        validateRequest('create'),
        createUserController.handle
    )
    .put(
        '/:id',
        isAuthenticated,
        validateRequest('update'),
        updateUserController.handle
    )
    .delete(
        '/:id',
        isAuthenticated,
        validateRequest('delete'),
        deleteUserController.handle
    )    


export default UserRoutes