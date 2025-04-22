
import React from "react";

const Home = async () => {

  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          all posts
        </h1>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
              <p className="mt-2 text-gray-600">{post.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
