import { Request, Response } from "express";

const errorHandler = function (err: Error, req: Request, res: Response)
{
    // Log the exception
    res.status(res.statusCode).send('Something went wrong.');
}

export default errorHandler;