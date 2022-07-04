import { createRoot } from 'react-dom/client';

const container = document.getElementById('layout-root') as HTMLDivElement;

const root = createRoot(container);

root.render(<div>Hello World React</div>);

export {};
