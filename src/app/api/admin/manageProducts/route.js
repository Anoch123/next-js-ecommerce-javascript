import connectToDB from "@/database";
// import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewProductSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Name should be a string',
        'string.empty': 'Name is required',
    }),
    description: Joi.string().required().messages({
        'any.required': 'Description should be a string',
        'string.empty': 'Description is required',
    }),
    price: Joi.number().required().messages({
        'any.required': 'Price should be a number',
        'number.empty': 'Price is required',
    }),
    category: Joi.string().required().messages({
        'any.required': 'Category should be a string',
        'string.empty': 'Category is required',
    }),
    sizes: Joi.array().min(1).required().messages({
        'any.required': 'Sizes should be an array',
        'array.min': 'At least one size is required',
    }),
    deliveryInfo: Joi.string().required().messages({
        'any.required': 'Delivery information should be a string',
        'string.empty': 'Delivery information is required',
    }),
    onSale: Joi.string().required().messages({
        'any.required': 'On sale should be a string',
        'string.empty': 'On sale information is required',
    }),
    priceDrop: Joi.number().required().messages({
        'any.required': 'Price drop should be a number',
        'number.empty': 'Price drop information is required',
    }),
    imageUrl: Joi.array().required().messages({
        'any.required': 'Image URL should be an array',
        'string.empty': 'Image URL is required',
    }),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const user = 'admin'

    if (user === "admin") {
      const extractData = await req.json();

      const {
        name,
        description,
        price,
        imageUrl,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
      } = extractData;

      const { error } = AddNewProductSchema.validate({
        name,
        description,
        price,
        imageUrl,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlyCreatedProduct = await Product.create(extractData);

      if (newlyCreatedProduct) {
        return NextResponse.json({
          success: true,
          message: "Product added successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to add the product ! please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized !",
      });
    }
  } catch (error) {
    return NextResponse.json({
        success: false,
        message: error.message,
    });
  }
}