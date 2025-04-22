
export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function PostDetail({ params }) {
  
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const post = await res.json();

  return (
    <div className="container mx-auto p-6 mb-100%">
      <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-6">{post.title}</h1>
      <p className="text-lg text-gray-700">{post.body}</p>
    </div>
  );
}
