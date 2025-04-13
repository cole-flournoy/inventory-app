import { Request, Response } from "express";
import User from "../models/user";
import Company from "../models/company";
import createSecretToken from "../utils/SecretToken";

export const Signup = async (req: Request, res: Response) => {
  const { name, company, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.json({ message: "User already exists" });
      return;
    }
    
    const newCompany = new Company({ name: company });
    await newCompany.save();

    const newUser = new User({
      name,
      username,
      password,
      companyId: newCompany._id,
      role: 'ADMIN',
    });

    await newUser.save();

    const token = createSecretToken(newUser._id as string);
    res.cookie("token", token, {
      httpOnly: false,
    });
    
    res.status(201).json({ success: true });
    console.log('User created:', newUser);
    console.log('Company created:', newCompany);

  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const Login = async (req: Request, res: Response) => {
  console.log('Login request received:', req.body);
  
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }
    
    const isPasswordValid = await user.comparePassword(req.body.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }
    
    const token = createSecretToken(user._id as string);
    res.cookie("token", token, {
      httpOnly: false,
    });

    res.status(201).json({ success: true });
    console.log('User logged in:', user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}