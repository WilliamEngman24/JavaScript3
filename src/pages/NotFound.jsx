NotFound.route = {
  path: '*',
  index: Infinity
};

export default function NotFound() {
  return <>
    <h2>Page Not Found</h2>
    <p>We are sorry but the page you were looking for does not exist on our site!</p>
  </>;
}