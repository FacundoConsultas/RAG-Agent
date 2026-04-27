import { NavLink } from 'react-router-dom'
import { Home, Upload, Search, BarChart3 } from 'lucide-react'

const links = [
  { to: '/', icon: Home, label: 'Inicio' },
  { to: '/upload', icon: Upload, label: 'Subir Docs' },
  { to: '/query', icon: Search, label: 'Consultar' },
  { to: '/dashboard', icon: BarChart3, label: 'Métricas' },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-56 border-r border-white/10 flex flex-col pt-6 px-3"
      style={{ background: '#0d0f18' }}>
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 px-3 mb-4">Navegación</p>
      <nav className="flex flex-col gap-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-600/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}>
            <Icon size={16} />{label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}