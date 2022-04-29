import {useEffect, useState} from 'react';
import * as service from '../../services/likes-service';
import {AlertBox, Tuits} from '../../components';

/**
 *
 * @param {string} uid The uid of the user who's likes should be rendered
 * @returns A page view of the given user's liked tuits
 */
const UsersLikes = ({uid}) => {
    const [tuits, setTuits] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        /**
         * findMyTuits finds tuits liked by user
         * @returns A list of the tuits the given user has liked
         */
        const findMyTuits = async () => {
            const res = await service.findAllTuitsLikedByUser(uid);
            if (res.error) {
                return setError(
                    'We ran into an issue showing your liked tuits. Please try again later.'
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

export default UsersLikes;