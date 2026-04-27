import { createElement} from 'react';

import Start from './pages/Start';
import AboutUs from './pages/AboutUs';

//vit can do glob imports
const pages = import.meta.glob('./pages/*.jsx', {eager: true});
//console.log(pages);


//build the routes
const routes = Object.values(pages)
  .map(page => page.default)
  .map(page => ({ ...page.route, element: createElement(page) }))
  .sort((a, b) => a.index - b.index);


//console.log(routes);

export default routes;