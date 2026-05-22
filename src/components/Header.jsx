import { Link } from 'react-router-dom';

// src/components/Header.jsx
export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 px-8 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          DISEÑO UX
        </Link>
        <Link to="/" className="p-3 rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center w-14 h-14 text-xl">
          🏠
        </Link>
      </div>
    </header>
  );
}