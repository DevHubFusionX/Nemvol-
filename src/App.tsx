import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ModalProvider } from './components/ui/ModalContext';
import ProjectModal from './components/ui/ProjectModal';

export default function App() {
  return (
    <ModalProvider>
      <RouterProvider router={router} />
      <ProjectModal />
    </ModalProvider>
  );
}
