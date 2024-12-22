import styles from "./styles.module.css"
export default async function ProfilePage() {
    const data = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await data.json()
    return (
        <div className={styles.container}>
            <h1>个人简介</h1>
            <ul>
                {users.map((user: any) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    )
}