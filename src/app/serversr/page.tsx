
import Link from 'next/link';

async function fetchPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export default async function PostsPage() {
  const posts = await fetchPosts();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Posts</h1>
        <ul className="space-y-4">
          {posts.map(post => (
            <li
              key={post.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
            >
              <Link href={`/serversr/${post.id}`} className="text-xl font-semibold text-indigo-600 hover:text-indigo-800">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
