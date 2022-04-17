import TextPage from './components/pages/TextPage';
import CVPage from './components/pages/CVPage';
import GalleryPage from './components/pages/GalleryPage';
import { NotFound } from './components/pages/NotFound'

export const intro = 'https://polina.space/ng4/data/intro2.php';

export const pages = [
    {
        name: 'home',
        path: '/',
        title: 'Why React CV?',
        component: TextPage,
        showAbout: true,
        dataUrl: 'https://polina.space/ng4/data/react.php'
    },
    {
        name: 'CV',
        path: '/CV',
        title: 'CV',
        component: CVPage,
        dataUrl: 'https://polina.space/ng4/data/CV.php'
    },
    {
        name: 'gallery',
        path: '/gallery',
        title: 'Gallery',
        component: GalleryPage,
        dataUrl: 'https://polina.space/ng4/data/gallery.php'
    },
    {
        name: 'about me',
        path: '/about',
        title: 'About me',
        component: TextPage,
        dataUrl: 'https://polina.space/ng4/data/intro2.php'
    },
    {
        //NotFound page should be always the last node of this array
        //If you need more pages, add them above
        name: '',
        path: '*',
        title: '',
        component: NotFound
    }

];