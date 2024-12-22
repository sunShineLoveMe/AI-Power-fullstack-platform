"use client"
import { useActionState } from "react"
import { createUser } from "../actions"

const initialState = {
    message: ''
}

export default function Signup() {

    const [state, formAction, pending] = useActionState(createUser, initialState)

    return (
        <form action={formAction}>
            <label htmlFor="email">Email</label>
            <input className="border border-black-800 rounded-md p-2" type="text" id="email" name="email" required />
            <p aria-live="polite">{state?.message}</p>
            <button className="bg-blue-500 text-white rounded-md p-2" disabled={pending}>Sign Up</button>
        </form>
    )
}