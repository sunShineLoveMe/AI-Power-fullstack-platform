import { redirect } from "next/navigation";

// async function fetchTeam(id: string) {
//     const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
//     return data.json();
// }

export default async function Profile({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    if (!id) {
        redirect('/login');
    }
}
