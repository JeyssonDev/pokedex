import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { buscarPoke } from '../helpers/api';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: {
        x: '10vw',
        opacity: 0,
    },
    show: {
        x: '0vw',
        opacity: 1,
        transition: { delay: 0.3 },
    },
};

const Detail = () => {
    const { nombre } = useParams();
    const [pokemon, setpokemon] = useState([]);
    const [imagen1, setimagen1] = useState('');

    const front = pokemon?.sprites?.front_default;

    const fetchSpecies = async () => {
        setimagen1(pokemon?.sprites?.other?.dream_world?.front_default);
    };

    useEffect(() => {
        const setElegido = async () => {
            setpokemon(await buscarPoke(nombre));
            fetchSpecies(await pokemon.id);
        };

        setElegido();
    }, [front]);

    return (
        <>
            {
                <motion.section
                    id="detail"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                >
                    <div className="card-image">
                        <img
                            onMouseOver={() => changeImage('back')}
                            onMouseLeave={() => changeImage()}
                            src={imagen1}
                            alt=""
                        />
                    </div>
                    <div className="container-height">
                        <p>
                            <strong>Altura:</strong> {pokemon.height / 10} m
                        </p>
                    </div>
                    <h1>{pokemon.name}</h1>
                    <div>
                        <div className="stats">
                            <div className="movements">
                                {pokemon?.types?.map((type, index) => {
                                    return (
                                        <span className={'type'} key={index}>
                                            # {type.type.name}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </motion.section>
            }
        </>
    );
};

export default Detail;
