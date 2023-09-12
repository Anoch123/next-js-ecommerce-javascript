import connectToDB from "@/database";
import User from "@/models/user";
import { compare, hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const schema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required.',
        'string.empty': 'Email cannot be empty.',
        'string.email': 'Email must be a valid email address.'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required.',
        'string.empty': 'Password cannot be empty.'
    })
});

export const dynamic = "force-dynamic";

export async function POST(req) {
    await connectToDB();

    const { email, password } = await req.json();

    // validating the user data the schema of user modal
    const { error } = schema.validate({ email, password });

    if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
    }

    try {
        // check if the user already exist
        const checkUser = await User.findOne({ email });
        if(!checkUser){
            return NextResponse.json({
                success: false,
                message: "No user found for this email address.Please re-check and try again!.",
            });
        } else {
            const checkPassword = await compare(password, checkUser.password);
            if(!checkPassword) {
                return NextResponse.json({
                    success: false,
                    message: "The entered password is incorrect.Please re-check and try again!.",
                });
            }

            const token = jwt.sign(
                {
                  id: checkUser._id,
                  email: checkUser?.email,
                  role: checkUser?.role,
                },
                process.env.TOKEN_SECRET,
                { expiresIn: "1d" }
            );

            const finalData = {
                token,
                user: {
                  email: checkUser.email,
                  name: checkUser.name,
                  _id: checkUser._id,
                  role: checkUser.role,
                },
            };

            return NextResponse.json({
                success: true,
                message: "Login successfull!",
                finalData,
            });
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        });
    }
}