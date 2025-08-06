import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home.tsx';
import About from "./pages/public/About.tsx";
import Contact from "./pages/public/Contact.tsx";
import Products from "./pages/public/Products.tsx";
import Cart from "./pages/public/Cart.tsx";
import LoginForm from "./pages/public/Login.tsx";
import Registrationform from "./pages/public/Registration.tsx";
import Blogs from "./pages/public/Blogs.tsx";
import '../ressources/css/app.css';
import 'flowbite';
import Layout from "./components/layout/Layout.tsx"
import Profile from "./pages/public/Profile.tsx";
import DetailProduct from "./pages/public/DetailProduct.tsx";
import ProductsManagementPage from "./pages/Admin/ProductsManagementPage.tsx";
import ProfilePage from "./pages/public/ProfilePage.tsx";
import LayoutProfilePage from "./components/ProfilePage/LayoutProfilePage.tsx";
import Account from "./components/ProfilePage/Account.tsx";
import OrdersManagement from './components/ProfilePage/OrdersManagement.tsx';
import Overview from "./components/ProfilePage/Overview.tsx";
import UsersManagement from "./pages/Admin/UsersManagement.tsx";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Profile */}
                <Route path="/users" element={<Layout><LayoutProfilePage><UsersManagement/></LayoutProfilePage></Layout>} />
                <Route path="/profile" element={<Layout><LayoutProfilePage><Overview/></LayoutProfilePage></Layout>} />
                <Route path="/orders" element={<Layout><LayoutProfilePage><OrdersManagement/></LayoutProfilePage></Layout>} />
                <Route path="/account" element={<Layout><LayoutProfilePage><Account/></LayoutProfilePage></Layout>} />
                <Route path="/admin/products" element={<Layout><ProductsManagementPage /></Layout>} />

                {/* Home */}
                <Route path="/products/:id" element={<Layout><DetailProduct /></Layout>} />
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/about" element={<Layout><About /></Layout>} />
                <Route path="/products" element={<Layout><Products /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                <Route path="/blogs" element={<Layout><Blogs /></Layout>} />
                <Route path="/cart" element={<Layout><Cart /></Layout>} />
                <Route path="/login" element={
                    <Layout>
                        <LoginForm />
                    </Layout>
                } />
                <Route path="/registration" element={
                    <Layout>
                        <Registrationform />
                    </Layout>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;