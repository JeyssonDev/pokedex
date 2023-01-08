import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardRoute from './components/DashboardRoute';
import { Login } from './components/Login';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/*" element={<DashboardRoute />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
