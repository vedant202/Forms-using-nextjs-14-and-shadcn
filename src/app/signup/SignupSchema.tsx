import {z} from 'zod';

export const SignupSchema=z.object({
    email:z.string().email({message:"email is required"}).trim(),
    accountType:z.enum(["personal","company"]),
    companyName:z.string().trim().optional(),
    password: z.string().trim().min(4).max(20),
    ConfirmPassord:z.string().trim().min(4).max(20),

}).refine((data)=>{
    return data.password===data.ConfirmPassord;
},{
    message:"Passwords doesn't match",
    path:["ConfirmPassord"]
}).refine((data)=>{
    if(data.accountType==="company"){
        console.log("checking zod ",!!data.companyName)
        return !!data.companyName;
    }
    return true;
},{
    message:"Enter company name",
    path:["companyName"]
});

