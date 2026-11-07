import * as userModel from "../models/userModel.js";
import ValidationError from "../utils/ValidationError.js";
import validator from 'validator';
import bcrypt from 'bcryptjs';

const doesUserExist = async (email) => {
    const existingUser = await userModel.findUserByEmail(email);

    if (existingUser.length > 0) {
         return {result: true, user: existingUser[0]};
    }

        return {result: false, user: undefined};
    }
    

export const creatAccount = async (user) => {
    if (!user.name || !user.email || !user.password) {
        throw new ValidationError("Name, email and password is required!", 400);
    }

    if (!validator.isEmail(user.email)) {
        throw new ValidationError('Invalid email format!', 400);

    }

    if (!validator.isStrongPassword(user.password)) {
        throw new ValidationError('Password is not strong enough!', 400);
    }

    const exsting = await doesUserExist(user.email);
    
    if (exsting.result) {
        throw new ValidationError('An account with that email already exists!', 400);
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);    

    const result = await userModel.insert(user.name, user.email, hashedPassword);

    if (!result || result <= 0) {
        throw new ValidationError( 'Unable to create account. please try again!');
    }

    return 'Account created successfully!';

}
export const login = async (user) => {
     if (!user.email || !user.password) {
        throw new ValidationError('Email and password is required!', 400);
    }
    
    const exsting = await doesUserExist(user.email);
    
    if (!exsting.result) {
        throw new ValidationError('An account with that email does not exist', 400);
    }

    const isCorrectPassword = bcrypt.compareSync(user.password, exsting.user.password);

    if (!isCorrectPassword) {
        throw new ValidationError('Incorrect password!');
    }  

    return 'Login successful!';
}