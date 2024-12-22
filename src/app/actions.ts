"use server"
import { redirect } from "next/navigation";

export async function createUser(prevState: any, formData: FormData) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
    const email = formData.get('email') as string;
    // 邮箱格式验证
    if(email && !email.includes('@')) {
        return { message: "请输入合法的邮箱格式" }
    }

    redirect('/dashboard');
}
