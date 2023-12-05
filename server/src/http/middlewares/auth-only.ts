import { FastifyReply, FastifyRequest } from "fastify";

export async function authOnly(req:FastifyRequest, res: FastifyReply){
    try {
        return await req.jwtVerify();
    } catch (error) {
        return res.status(401).send({
            message: "Unauthorized"
        })
    }
}