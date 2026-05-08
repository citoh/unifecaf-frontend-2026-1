import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/sobre', label: 'Sobre' },
  { to: '/contato', label: 'Contato' },
  { to: '/produto/1', label: 'Produto 1' },
  { to: '/produto/2', label: 'Produto 2' },
  { to: '/produto/3', label: 'Produto 3' },
]

export default function Menu() {
  return (
    <nav className="menu" aria-label="Menu principal">
      <ul className="menu__list">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive ? 'menu__link menu__link--active' : 'menu__link'
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
