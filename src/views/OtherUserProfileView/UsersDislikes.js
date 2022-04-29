import {useEffect, useState} from 'react';
import * as service from '../../services/likes-service';
import {AlertBox} from '../../components';
import {Tuits} from '../../components';

/**
 *
 * @param {string} uid The uid of the user who's dislikes should be rendered
 * @returns A page view of the given user's disliked tuits
 */
const UsersDislikes = ({uid}) => {
    const [tuits, setTuits] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        /**
         * Find all of the tuits this user dislikes
         * @returns disliked tuits for this user
         */
        const findMyDislikes = async () => {
            const res = await service.findAllTuitsDislikedByUser(uid);
            if (res.error) {
                return setError(
                    'We ran into an issue showing your disliked tuits. Please try again later.'
                );
            }
            setTuits(res);
        };
        findMyDislikes();
    }, [uid]);

    return (
        <div>
            {error && <AlertBox message={error}/>}
            {tuits && <Tuits tuits={tuits}/>}
        </div>
    );
};

export default UsersDislikes;
