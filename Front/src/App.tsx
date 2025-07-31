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
import Layout from "../src/components/layout/index.tsx"
import Profile from "./pages/public/Profile.tsx";
import DetailProduct from "./pages/public/DetailProduct.tsx";
import ProductsPage from "./pages/Admin/ProductsPage";
import GuardRoutes from "./components/GuardRoutes.tsx";
function App() {
    return (
        <BrowserRouter>
            <Routes>
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
                <Route path="/profile" element={<Layout><Profile /></Layout>} />
                <Route path="/detail" element={<Layout><DetailProduct /></Layout>} />
                <Route path="/admin/products" element={<Layout><ProductsPage /></Layout>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;