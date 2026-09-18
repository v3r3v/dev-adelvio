/// <reference types="vite/client" />
import {createRoot, hydrateRoot} from 'react-dom/client';
import Home from '../app/page';
import '../app/globals.css';
import '../app/studio.css';
import '../app/brand.css';
import '../app/experience.css';
import '../app/header.css';
import '../app/refinement.css';
import '../app/canvas.css';
import '../app/theme.css';
import '../app/calm.css';
import '../app/public-pages.css';

const root = document.getElementById('root')!;
const path = window.location.pathname.replace(/\/$/, '');
const view = path.endsWith('/contact') ? 'contact' : path.endsWith('/start-project') ? 'project' : 'home';
const page = <Home assetBase={import.meta.env.BASE_URL} page={view}/>;
if (root.hasChildNodes()) {
  hydrateRoot(root, page);
} else {
  createRoot(root).render(page);
}
