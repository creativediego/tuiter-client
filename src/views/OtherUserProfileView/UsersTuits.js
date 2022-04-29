import {useEffect, useState} from 'react';
import * as service from '../../services/tuits-service';
import {Tuits, AlertBox} from '../../components';

/**
 *
 * @param {string} uid The uid of the user who's tuits should be rendered
 * @returns A page view of the given user's tuits
 */
const UsersTuits = ({uid}) => {
    const [tuits, setTuits] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        /**
         * findMyTuits gets tuits posted by user
         * @returns a list of the tuits this user has posted
         */
        const findMyTuits = async () => {
            const res = await service.findTuitsByUser(uid);
            if (res.error) {
                return setError(
                    'We ran into an issue showing your tuits. Please try again later.'
                );
            }

            setTuits(res);
        };
        findMyTuits();
    }, [uid]);

    return (
        <div>
            {error && <AlertBox message={error}/>}
            {tuits && <Tuits tuits={tuits}/>}
        </div>
    );
};

export default UsersTuits;
