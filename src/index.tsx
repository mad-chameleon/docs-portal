import ReactDOM from 'react-dom/client';
import './index.css';
import init from './init';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(init());
