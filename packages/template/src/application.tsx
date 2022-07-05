import { createRoot } from 'react-dom/client';
import Skeleton from './Skeleton/Skeleton';

const container = document.getElementById('layout-root') as HTMLDivElement;

const root = createRoot(container);

root.render(<Skeleton />);

export {};
