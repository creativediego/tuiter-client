import React, {createContext, useState} from 'react';
import TuitStats from './TuitStats';
import TuitImage from './TuitImage';
import TuitVideo from './TuitVideo';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTuitThunk} from '../../redux/tuitSlice';
import {Link} from 'react-router-dom';

export const TuitContext = createContext();

/**
 * Displays a tuit with all of its information, including Author, time, and stats (likes, dislikes, etc). Includes action to handle tuit deletion if the tuit belongs to logged in user.
 */
const Tuit = ({tuitFromList}) => {
    const [tuit, setTuit] = useState(tuitFromList);
    const userId = useSelector((state) => state.user.data.id);
    const dispatch = useDispatch();
    const handleDeleteTuit = async (tid) => {
        dispatch(deleteTuitThunk(tuit.id));
    };
    return (
        tuit && (
            <TuitContext.Provider value={[tuit, setTuit]}>
                <li className='p-2 ttr-tuit list-group-item d-flex rounded-0'>
                    <Link to={userId === tuit.author.id ? '/profile' : `/tuiter/${tuit.author.id}`}>
                        <div className='pe-2'>
                            {tuit.author && (
                                <img
                                    src={
                                        tuit.author.profilePhoto
                                            ? tuit.author.profilePhoto
                                            : `../images/${tuit.author.username}.jpg`
                                    }
                                    className='ttr-tuit-avatar-logo rounded-circle'
                                    alt='profile'
                                />
                            )}
                        </div>
                    </Link>
                    <div className='w-100'>
                        {userId === tuit.author.id ? ( // only delete if tuit belongs to user
                            <i
                                onClick={() => handleDeleteTuit(tuit.id)}
                                className='fas btn fa-remove fa-2x fa-pull-right'
                            ></i>
                        ) : null}
                        <p className='fs-6 fw-bold'>
                            {tuit.author && tuit.author.name} -
                            {/* This link and the one above will naviagate a user's the profile page for the user who posted this tuit.  */}
                            <Link
                                to={userId === tuit.author.id ? '/profile' : `/tuiter/${tuit.author.id}`}>@{tuit.author && tuit.author.username}</Link> - {tuit.createdAt}
                        </p>
                        {tuit.tuit}
                        {tuit.youtube && <TuitVideo/>}
                        {tuit.image && <TuitImage/>}
                        <TuitStats/>
                    </div>
                </li>
            </TuitContext.Provider>
        )
    );
};
export default Tuit;
