export default async function BlogPage() {
    const data = await fetch('https://api.vercel.app/blog', {
        signal: AbortSignal.timeout(5000),
        // 添加缓存
        next: {
            revalidate: 3600,
        }
    })
    console.log(data);
    const posts = await data.json()
    return (
        <div>
            <ul>
                {posts.map((post: any) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    )
}