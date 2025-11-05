import { Link } from "react-router-dom";

export default function Blog() {
  const posts = [
    { id: "hello-world", title: "Hello World" },
    { id: "tailwind-tricks", title: "Tailwind Tricks" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      <ul className="space-y-2">
        {posts.map((p) => (
          <li key={p.id}>
            <Link to={`/blog/${p.id}`} className="text-blue-600 hover:underline">
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
