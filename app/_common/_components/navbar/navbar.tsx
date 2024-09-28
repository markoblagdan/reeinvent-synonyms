import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 flex-initial">
      <div className="container mx-auto flex justify-start gap-12">
        <Link href="/" className="text-white hover:text-gray-400">
          Lookup synonyms
        </Link>
        <Link href="/add-synonyms" className="text-white hover:text-gray-400">
          Add synonyms
        </Link>
      </div>
    </nav>
  );
}
