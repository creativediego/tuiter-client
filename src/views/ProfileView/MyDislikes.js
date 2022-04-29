import {useEffect, useState} from 'react';
import * as service from '../../services/likes-service';
import {AlertBox} from '../../components';
import {Tuits} from '../../components';

const MyDislikes = () => {
    const [tuits, setTuits] = useState();
    const [error, setError] = useState();
    const findMyTuits = async () => {
        const res = await service.findAllTuitsDislikedByUser('me');
        if (res.error) {
            return setError(
                'We ran into an issue showing your disliked tuits. Please try again later.'
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

export default MyDislikes;
