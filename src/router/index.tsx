import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../dashboard/DashboardLayout';
import Overview from '../dashboard/pages/Overview/Overview';
import Storefront from '../dashboard/pages/Storefront/Storefront';
import Products from '../dashboard/pages/Products/Products';
import Orders from '../dashboard/pages/Orders/Orders';
import Purchases from '../dashboard/pages/Purchases/Purchases';
import Reviews from '../dashboard/pages/Reviews/Reviews';
import Customers from '../dashboard/pages/Customers/Customers';
import Payments from '../dashboard/pages/Payments/Payments';
import Invoices from '../dashboard/pages/Invoices/Invoices';
import Pages from '../dashboard/pages/Pages/Pages';
import Domain from '../dashboard/pages/Domain/Domain';
import Tools from '../dashboard/pages/Tools/Tools';
import Locations from '../dashboard/pages/Locations/Locations';
import Shipment from '../dashboard/pages/Shipment/Shipment';
import StoreInfo from '../dashboard/pages/StoreInfo/StoreInfo';
import Staffs from '../dashboard/pages/Staffs/Staffs';
import Billing from '../dashboard/pages/Billing/Billing';
import Profile from '../dashboard/pages/Profile/Profile';
import Home from '../pages/Home';
import About from '../pages/About';
import Team from '../pages/Team';
import Careers from '../pages/Careers';
import Work from '../pages/Work';
import FAQ from '../pages/FAQ';
import Partners from '../pages/Partners';
import Contact from '../pages/Contact';
import Solutions from '../pages/Solutions';
import Services from '../pages/Services';
import Pricing from '../pages/Pricing';
import Blog from '../pages/Blog';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { path: '', element: <Overview /> },
      { path: 'storefront', element: <Storefront /> },
      { path: 'products', element: <Products /> },
      { path: 'orders', element: <Orders /> },
      { path: 'purchases', element: <Purchases /> },
      { path: 'reviews', element: <Reviews /> },
      { path: 'customers', element: <Customers /> },
      { path: 'payments', element: <Payments /> },
      { path: 'invoices', element: <Invoices /> },
      { path: 'pages', element: <Pages /> },
      { path: 'domain', element: <Domain /> },
      { path: 'tools', element: <Tools /> },
      { path: 'locations', element: <Locations /> },
      { path: 'shipment', element: <Shipment /> },
      { path: 'store-info', element: <StoreInfo /> },
      { path: 'staffs', element: <Staffs /> },
      { path: 'billing', element: <Billing /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'team', element: <Team /> },
      { path: 'careers', element: <Careers /> },
      { path: 'work', element: <Work /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'partners', element: <Partners /> },
      { path: 'contact', element: <Contact /> },
      { path: 'solutions', element: <Solutions /> },
      { path: 'services', element: <Services /> },
      { path: 'pricing', element: <Pricing /> },
      { path: 'blog', element: <Blog /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
