import connectToDB from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Name is required.',
        'string.empty': 'Name cannot be empty.'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required.',
        'string.empty': 'Email cannot be empty.',
        'string.email': 'Email must be a valid email address.'
    }),
    password: Joi.string().min(6).required().messages({
        'any.required': 'Password is required.',
        'string.empty': 'Password cannot be empty.',
        'string.min': 'Password must be at least 6 characters long.'
    })
});

export const dynamic = "force-dynamic";

export async function POST(req) {
    await connectToDB();

    const { name, email, password } = await req.json();

    // validating the user data the schema of user modal
    const { error } = schema.validate({ name, email, password });

    if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
    }

    try {
        // check if the user already exist
        const isUserAlreadyExists = await User.findOne({ email });
        if(isUserAlreadyExists){
            return NextResponse.json({
                success: false,
                message: "User is already exists. Please try with different email.",
            });
        } else {
            const hashPassword = await hash(password, 12);

            const newlyCreatedUser = await User.create({
                name,
                email,
                password: hashPassword,
                role: "customer",
            });

            if (newlyCreatedUser) {
                return NextResponse.json({
                  success: true,
                  message: "Account created successfully.",
                });
            }
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        });
    }
}