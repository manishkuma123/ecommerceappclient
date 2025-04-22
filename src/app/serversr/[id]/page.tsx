
async function fetchPost(id: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }
    return res.json();
  }
  
  export default async function PostPage({ params }: { params: { id: string } }) {
   
    const { id } = await params; 
  
    const post = await fetchPost(id);
  
    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <p className="text-lg text-gray-700">{post.body}</p>
        </div>
      </div>
    );
  }
  

