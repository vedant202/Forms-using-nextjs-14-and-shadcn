"use server"

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

type MessageStatus={
    success:boolean,
    message:string,
    error?:string
}



const prisma = new PrismaClient();

export default async function addToDo(formData: FormData):Promise<MessageStatus> {
    console.log('formData title ',formData.get("title"));
    console.log('formData desc ',formData.get("desc"));
    let title: string = formData.get("title")?.toString() ?? "" ;
    let desc: string = formData.get("desc")?.toString() ?? "" ;
    console.log('title ',title);
    console.log('desc ',desc);
    const todo = await prisma.todos.create({
        data:{
            title:title,
            desc:desc
        }
    })

    console.log("Added Todo :- ",todo," Type of todo:- ",typeof todo);
    revalidatePath("/");
    return {success:true,message:"Todo Added"};

}
