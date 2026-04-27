NotFound.route = {
  path: '*',
  index: Infinity
}

export default function NotFound() {
  return <h2>404 Not Found</h2>;
}