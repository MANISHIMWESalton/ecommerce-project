import { users } from "@prisma/client"
import *as exprss from "express"

declare module "express" {
    export interface Request {
        user?: users
    }
}