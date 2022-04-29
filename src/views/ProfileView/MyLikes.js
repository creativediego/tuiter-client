import {useEffect, useState} from 'react';
import * as service from '../../services/likes-service';
import {AlertBox, Tuits} from '../../components';

const MyLikes = () => {
    const [tuits, setTuits] = useState([]);
    const [error, setError] = useState();
    const findMyTuits = async () => {
        const res = await service.findAllTuitsLikedByUser('me');
        if (res.error) {
            return setError(
                'We ran into an issue showing your liked tuits. Please try again later.'
            );
        }

        setTuits(res);
    };
    useEffect(() => {
        findMyTuits();
    }, []);

    return (
        <div>
            {error && <AlertBox message={error}/>}
            {tuits && <Tuits tuits={tuits}/>}
        </div>
    );
};

export default MyLikes;
