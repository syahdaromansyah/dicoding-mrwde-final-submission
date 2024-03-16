import { Link } from '@tanstack/react-router';
import pageNotFound from '../assets/page-not-found-illustration.svg';

export default function RootPageNotFound() {
  return (
    <div className="pt-32">
      <img
        className="mx-auto mb-4 block w-[228px]"
        src={pageNotFound}
        alt="Page is not found"
      />

      <p className="mb-1 text-center text-xl font-semibold">
        Page is not found
      </p>

      <p className="text-center">
        <Link className="inline-block text-center underline" to="/">
          Back to homepage
        </Link>
      </p>
    </div>
  );
}
