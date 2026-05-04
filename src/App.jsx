import Header from "./partials/Header";
import Footer from "./partials/Footer";
import { Outlet } from 'react-router';

export default function App() {
  return <>
    <Header />
    <main><Outlet /></main>
    <Footer />
  </>;
}