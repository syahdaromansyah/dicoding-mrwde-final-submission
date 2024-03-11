import { Link } from '@tanstack/react-router';

export default function RootPageNotFound() {
  return (
    <div className="p-4">
      <h1 className="text-center font-mono text-2xl">Page Is Not Found</h1>
      <Link className="inline-block text-center text-xl font-bold" to="/">
        Back to homepage
      </Link>
    </div>
  );
}
