import { Router } from 'express'
import isAuthenticated from '../middlewares/JWTAuthentication'
import validate from '../middlewares/RequestValidator/Tokens'
import { refreshTokenController } from '../useCases/Token/RefreshToken'
import { revokeRefreshTokenController } from '../useCases/Token/RevokeRefreshToken'

const TokenRoutes = Router()

TokenRoutes
    .post(
        '/refresh',
        isAuthenticated,
        validate('refreshToken'),
        refreshTokenController.handle
    )
    .put(
        '/revoke',
        isAuthenticated,
        validate('revokeRefreshToken'),
        revokeRefreshTokenController.handle
    )


export default TokenRoutes