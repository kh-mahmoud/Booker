import { z } from "zod";

export const signUp_schema= z.object({
    name:z.string().min(3),
    email:z.string().email(),
    universityId:z.coerce.number(),
    universityCard:z.string().nonempty("Card is required"),
    password:z.string().min(8),
})

export const signIn_schema= z.object({
    email:z.string().email(),
    password:z.string().min(8,{message:"password must have at least 8 character(s)"}),
})


export const books_schema = z.object({
    title:z.string().min(3).trim().max(100,{message:"title must have at least 3 character(s)"}).nonempty("Title is required"),
    description:z.string().min(3).trim().max(1000,{message:"description must have at least 3 character(s)"}),
    author:z.string().min(3).trim().max(100,{message:"author must have at least 3 character(s)"}),
    genre:z.string().min(3).trim().max(50,{message:"genre must have at least 3 character(s)"}).nonempty("Genre is required"),
    rating:z.coerce.number().min(1).max(5,{message:"rating must be between 1 and 5"}).positive(),
    totalCopies:z.coerce.number().min(1).max(100,{message:"totalCopies must be between 1 and 100"}).positive(),
    coverUrl:z.string().nonempty("Cover is required"),
    coverColor:z.string().trim().nonempty("Cover color is required").regex(/^#([0-9A-F]{6})$/i,"Cover color must be a valid hex color"),
    videoUrl:z.string().nonempty("Video is required"),
    summary:z.string().min(3).trim().max(1000,{message:"summary must have at least 3 character(s)"})
})