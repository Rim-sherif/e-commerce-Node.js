import userModel from "../../../dataBase/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { handelError } from "../../middelware/handelError.js";
import { AppError } from "../../Utiletis/AppError.js";

//SignUp
export const signUp = handelError(async (req, res, next) => {
  const { email, phone, name, password } = req.body;
  const existingUser = await userModel.findOne({ email: req.body.email });
  if (existingUser) return next(new AppError("email already exsist", 409));
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALTROUNDS)
  );
  const newUser = new userModel({
    email,
    phone,
    name,
    password: hashedPassword,
  });
  await newUser.save();
  res.json({ message: "success", user: newUser });
});

//LogIn
export const signIn = handelError(async (req, res, next) => {
  let { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new AppError("User not found. Please register.", 404));
  }

  const matched = await bcrypt.compare(password, user.password);
  console.log("Provided Password:", password);
  console.log("Stored Password:", user.password);
  console.log("Password Matched:", matched);
  if (!matched) {
    console.log(matched);
    return next(new AppError("Incorrect password.", 401));
  }

  const token = jwt.sign(
    { name: user.name, id: user._id, role: user.role },
    process.env.SECRET_KEY
  );
  res.json({ message: "Welcome!", token });
});

//Authrtition
export const protectRoutes = handelError(async (req, res, next) => {
  let { token } = req.header("token");
  if (!token) return next(new AppError("Please Provide Invalied Token", 401));
  let decoded = await jwt.verify(token, process.env.SECRET_KEY);

  let user = await userModel.findById(decoded.userId);
  if (!user) return next(new AppError("invalid user", 404));

  if (user.changePasswordAt) {
    let changePasswordTime = parseInt(user.changePasswordAt.detTime() / 1000);
    if (changePasswordTime > decoded.iat)
      return next(new AppError("Token Invalied", 401));
  }

  req.user = user;
  next();
});

// Allow To
export const allowTo = (...roles) => {
  return handelError((req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError("Not Authirzed", 403));
    next();
  });
};
