import {useEffect, useState} from 'react';
import * as service from '../../services/tuits-service';
import {Tuits, AlertBox} from '../../components';

const MyTuits = () => {
    const [tuits, setTuits] = useState([]);
    const [error, setError] = useState();
    const findMyTuits = async () => {
        const res = await service.findTuitsByUser('me');
        if (res.error) {
            return setError(
                'We ran into an issue showing your tuits. Please try again later.'
            );
        }

        setTuits(res);
    };
    useEffect(() => {
        findMyTuits();
    }, []);
    const deleteTuit = (tid) => service.deleteTuit(tid).then(findMyTuits);

    return (
        <div>
            {error && <AlertBox message={error}/>}
            <Tuits tuits={tuits} deleteTuit={deleteTuit}/>
        </div>
    );
};

export default MyTuits;
