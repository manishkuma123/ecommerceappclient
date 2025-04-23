// src/app/blog/page.tsx

interface BlogPost {
    id: string;
    title: string;
    author: string;
    content: string;
    category: string;
  }
  
  export default async function Page() {
    const res = await fetch('https://api.vercel.app/blog');
    const posts: BlogPost[] = await res.json();
  
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-12">
          Latest Blog Posts
        </h1>
        <ul className="space-y-8">
          {posts.map((post) => (
            <li
              key={post.id}
              className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300 transform hover:shadow-2xl"
            >
              <h2 className="text-3xl font-semibold text-white hover:text-teal-100 transition-colors duration-300">
                {post.title}
              </h2>
              <p className="mt-2 text-2xl text-black">{post.author}</p>
              <p className="text-teal-100 mt-4">
                {post.content.substring(0, 200)}...
              </p>
              <p className="text-blue-700 mt-4 italic">Category: {post.category}</p>
              <a
                href={`/blog/${post.id}`}
                className="text-teal-100 mt-4 inline-block text-lg font-medium hover:text-white transition-colors duration-300"
              >
                Read More
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  