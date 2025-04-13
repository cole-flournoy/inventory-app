import User from "../models/user";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
dotenv.config();

export const returnAuthenticatedUser = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }


  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userId = decoded.userId;

    User.findById(userId)
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "User not found" });
          return
        } else {
          res.status(200).json({ user: { name: user.name, role: user.role, companyId: user.companyId } });
        }
      })
  });  
}

export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }


  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userId = decoded.userId;

    User.findById(userId)
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "User not found" });
          return
        } else {
          req.body.user = { name: user.name, role: user.role, companyId: user.companyId };
          next();
        }
      })
  });  
}