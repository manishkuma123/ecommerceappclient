export default async function Home() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return (
    <div className="container mx-auto p-6 ">
      <h1 className="text-4xl font-extrabold text-center text-black  mb-6">Blog Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="p-4 border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
          >
            <a
              href={`/posts/${post.id}`}
              className="text-2xl font-semibold text-indigo-600 hover:text-indigo-800"
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
