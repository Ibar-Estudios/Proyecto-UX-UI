import { Link } from 'react-router-dom';

const navItems = [
  { to: '/research', label: '1. Research', color: 'from-blue-500 to-blue-700' },
  { to: '/planteamiento', label: '2. Planteamiento', color: 'from-green-500 to-green-700' },
  { to: '/user-persona', label: '3. Persona', color: 'from-purple-500 to-purple-700' },
  { to: '/encuestas', label: '4. Encuestas', color: 'from-emerald-500 to-emerald-700' },
  { to: '/entrevistas', label: '5. Entrevistas', color: 'from-orange-500 to-orange-700' },
  { to: '/mapa-empatia', label: '6. Empatía', color: 'from-pink-500 to-pink-700' },
  { to: '/user-journey', label: '7. Journey', color: 'from-teal-500 to-teal-700' },
  { to: '/PointOfView', label: '8. POV', color: 'from-red-500 to-red-700' },
  { to: '/storytelling', label: '9. Storytelling', color: 'from-violet-400 to-violet-500' },
  { to: '/storyboard', label: '10. Storyboard', color: 'from-rose-500 to-rose-700' },
  { to: '/benchmarking', label: '11. Benchmarking', color: 'from-yellow-500 to-yellow-700' },
  { to: '/cardsorting', label: '12. Cardsorting', color: 'from-gray-500 to-gray-800' },
  { to: '/dendrograma&matriz', label: '13. Dendrograma & Matriz de Similitud', color: 'from-indigo-700 to-indigo-500' },
  { to: '/mapadesitio', label: '14. Mapa de sitio', color: 'from-teal-700 to-teal-600' },
  { to: '/taskflow', label: '15. Task Flow', color: 'from-emerald-900 to-emerald-800' },
  { to: '/userflow', label: '16. User Flow', color: 'from-fuchsia-700 to-fuchsia-800' },
];

export default function SectionsNav() {
  return (
    <nav className="lg:w-80 lg:border-r border-slate-200 pr-8 sticky top-32 max-h-screen overflow-y-auto hidden lg:block">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 pb-4 border-b border-slate-200">
        Navegación UX
      </h2>
      <ul className="space-y-3">
        {navItems.map(({ to, label, color }) => (
          <li key={to}>
            <Link
              to={to}
              className={`block p-6 rounded-2xl hover:shadow-xl transition-all border-2 border-transparent hover:border-gray-200 hover:-translate-x-2 bg-gradient-to-r ${color} text-white font-semibold text-lg`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}