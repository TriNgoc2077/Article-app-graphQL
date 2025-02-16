"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolversUser = void 0;
const generate_1 = require("../Helpers/generate");
const user_Model_1 = __importDefault(require("../Model/user.Model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.resolversUser = {
    Query: {
        getUser: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (context.user === '') {
                    return {
                        code: 400,
                        message: 'Cant access this router !'
                    };
                }
                return {
                    code: 200,
                    message: 'success',
                    id: context.user.id,
                    fullName: context.user.fullName,
                    email: context.user.email,
                };
            }
            catch (error) {
                console.log(error);
            }
        })
    },
    Mutation: {
        registerUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { user } = args;
                const existEmail = yield user_Model_1.default.findOne({
                    email: user.email,
                    deleted: false
                });
                console.log(existEmail);
                if (existEmail) {
                    return {
                        code: 400,
                        message: 'User already exist !'
                    };
                }
                else {
                    user.password = yield bcrypt_1.default.hash(user.password, 12);
                    user.token = (0, generate_1.generateRandomString)(20);
                    const newUser = new user_Model_1.default(user);
                    const data = yield newUser.save();
                    return {
                        code: 200,
                        message: "Register Successfully !",
                        id: data.id,
                        fullName: data.fullName,
                        email: data.email,
                        token: data.token
                    };
                }
            }
            catch (error) {
                console.log(error);
                return {
                    code: 400,
                    message: error.message
                };
            }
        }),
        loginUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, password } = args.user;
            const infoUser = yield user_Model_1.default.findOne({
                email: email,
                deleted: false
            });
            if (!infoUser) {
                return {
                    code: 400,
                    message: 'User not found !'
                };
            }
            const isMatch = yield bcrypt_1.default.compare(password, infoUser.password);
            if (!isMatch) {
                return {
                    code: 400,
                    message: 'Password is incorrect !'
                };
            }
            return {
                code: 200,
                message: 'Login successfully !',
                id: infoUser.id,
                fullName: infoUser.fullName,
                email: infoUser.email,
                token: infoUser.token
            };
        })
    }
};
