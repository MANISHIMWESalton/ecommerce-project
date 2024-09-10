import express, { NextFunction, Request, Response } from "express"
import *as jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const authMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt
    if (!token) {
        return res.json({ message: "No token provided!" })
    }
    try {
        const decoded: { id: string } = jwt.verify(token, process.env.JWT_SECRET as string) as any
        const user = await prisma.users.findFirst({ where: { id: decoded.id } })
        if (!user) {
            return res.json({ message: "User not found!" })
        }
        // req.user = user;
        next()
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
}
export default authMiddleWare