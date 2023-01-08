import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { buscarPoke } from '../helpers/api';
import { useForm } from '../hooks/useForm';
import Card from '../components/Card';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: {
        y: '5vw',
        opacity: 0,
    },
    show: {
        y: '0vw',
        opacity: 1,
        transition: { delay: 0.5 },
    },
};
const NavBar = () => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [pokemon, setPokemon] = useState();

    const [values, handleInputChange, reset] = useForm({
        busqueda: '',
    });

    const { busqueda } = values;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await buscarPoke(values.busqueda.toLocaleLowerCase());
        if (data === undefined || data === '') {
            Swal.fire({
                title: 'Error!',
                heightAuto: '1rem',
                text: `No se encontro nada referente a ${busqueda}`,
                icon: 'error',
                confirmButtonText: 'Cool',
            });
        } else {
            setPokemon(data);
            reset();
            setModal(true);
        }
    };

    const handleLogout = () => {
        Swal.fire({
            title: '¿Cerrar Sesión?',
            text: '¿Estás seguro que deseas salir?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/login');
            }
        });
    };

    return (
        <header>
            <nav>
                <div>
                    <img
                        onClick={() => navigate('/')}
                        className="pokeLogo"
                        src="https://crisgon.github.io/pokedex/src/images/logo.png"
                        alt="Pokemon Logo"
                    />
                    <form onSubmit={handleSubmit}>
                        <input
                            name="busqueda"
                            value={busqueda}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Buscar por nombre o ID"
                        />
                        <button type="submit">
                            <i className="fas fa-search"></i>
                        </button>
                    </form>
                </div>
                <div>
                    <img
                        onClick={handleLogout}
                        src="https://cdn-icons-png.flaticon.com/512/126/126467.png"
                        alt="logout"
                    />
                </div>
            </nav>
            {modal === true ? (
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    style={{ margin: '2rem auto' }}
                >
                    <button onClick={() => setModal(false)}>X</button>
                    <Card pokemon={pokemon} />
                </motion.section>
            ) : (
                ''
            )}
        </header>
    );
};

export default NavBar;
