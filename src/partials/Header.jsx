import routes from '../routes';
import { NavLink } from 'react-router';

export default function Header() {
  return <header>
    <h1>The Pet Shelter</h1>
    <nav>
      {routes
        .filter(x => x.label)
        .map(({ path, label }) => <NavLink key={path} to={path}>
          {label}
        </NavLink>
        )}
    </nav>
  </header>;
}