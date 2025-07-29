    import { BrowserRouter, Routes, Route } from 'react-router-dom';
    import Home from '../src/pages/public/home/index.tsx';
    import About from "../src/pages/public/about/index.tsx";
    import Contact from "../src/pages/public/contact/index.tsx";
    import Products from "../src/pages/public/products/index.tsx";
    import Cart from "../src/pages/public/Cart/index.tsx";
    import LoginForm from "./pages/public/account/login";
    import Registrationform from "./pages/public/account/registration";
    import Blogs from "../src/pages/public/blogs/index.tsx";
    import '../ressources/css/app.css';
    import 'flowbite';
    import Layout from "../src/components/layout/index.tsx"
    import Profile from "./pages/public/account/profile";
    import DetailProduct from "./pages/public/products/detail";
    import ProductsPage from "./pages/Admin/ProductsPage";
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
                    <Route path="/login" element={<Layout><LoginForm /></Layout>} />
                    <Route path="/registration" element={<Layout><Registrationform /></Layout>} />
                    <Route path="/profile" element={<Layout><Profile /></Layout>} />
                    <Route path="/detail" element={<Layout><DetailProduct /></Layout>} />
                    <Route path="/admin/products" element={<ProductsPage />} />
                </Routes>
            </BrowserRouter>
        );
    }

    export default App;
