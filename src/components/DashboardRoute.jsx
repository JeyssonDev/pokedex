import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Detail from '../components/Detail';
import Home from '../components/Home';
import NavBar from '../components/NavBar';

const DashboardRoute = () => {
    const location = useLocation();
    return (
        <>
            <NavBar />
            <AnimatePresence>
                <Routes location={location} key={location.key}>
                    <Route path="/pokedex" element={<Home />} />
                    <Route path="/detail/:nombre" element={<Detail />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                </Routes>
            </AnimatePresence>
        </>
    );
};

export default DashboardRoute;
