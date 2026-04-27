import Header from './partials/header.jsx';
import Footer from './partials/Footer.jsx';
import { Outlet } from 'react-router';

export default function App() {
  return <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
}
