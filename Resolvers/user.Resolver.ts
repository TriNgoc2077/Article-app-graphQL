import { generateRandomString } from "../Helpers/generate";
import User from "../Model/user.Model";
import bcrypt from 'bcrypt';
export const resolversUser = {
    Mutation: {
        registerUser: async (_: any, args: any) => {
            try {
                const { user } = args;

                const existEmail = await User.findOne({
                    email: user.email,
                    deleted: false
                });
                console.log(existEmail);
                if (existEmail) {
                    return {
                        code: 400,
                        message: 'User already exist !'
                    }
                } else {
                    user.password = await bcrypt.hash(user.password, 12);
                    user.token = generateRandomString(20);

                    const newUser = new User(user);
                    const data = await newUser.save();

                    return {
                        code: 200,
                        message: "Register Successfully !",
                        id: data.id,
                        fullName: data.fullName,
                        email: data.email,
                        token: data.token   
                    }
                }
            } catch(error) {
                console.log(error);
                return {
                    code: 400,
                    message: (error as Error).message
                }
            }
        },
        loginUser: async (_: any, args: any) => {
            const { email, password } = args.user;
            const infoUser = await User.findOne({
                email: email,
                deleted: false
            });
            if (!infoUser) {
                return {
                    code: 400,
                    message: 'User not found !'
                }
            }
            const isMatch = await bcrypt.compare(password, infoUser.password!);            
            if (!isMatch) {
                return {
                    code: 400,
                    message: 'Password is incorrect !'
                }
            }
            return {
                code: 200,
                message: 'Login successfully !',
                id: infoUser.id,
                fullName: infoUser.fullName,
                email: infoUser.email,
                token: infoUser.token
            }
        }
    }
}