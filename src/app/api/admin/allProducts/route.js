import connectToDB from "@/database";
// import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    await connectToDB();

    const user = 'admin';

    if (user === "admin") {
        try {
            const extractAllProducts = await Product.find({}).sort({ _id: -1 });;

            if(extractAllProducts){
                return NextResponse.json({
                    success: true,
                    data: extractAllProducts,
                });
            } else {
                return NextResponse.json({
                    success: false,
                    status: 201,
                    message: "No products found",
                });
            }
        } catch (error) {
            return NextResponse.json({
                success: false,
                message: error.message,
            });
        }
    } else {
        return NextResponse.json({
            success: false,
            message: "You are not authorized !",
        });
    }
}