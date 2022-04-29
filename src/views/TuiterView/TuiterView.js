import React from 'react';
import './TuiterView.css';
import {Routes, Route} from 'react-router-dom';
import {AlertBox, Navigation} from '../../components';
import {
    WhatsHappeningView,
    HomeView,
    BookmarksView,
    ProfileView,
    ExploreView,
    NotificationsView,
    MoreView,
    ListsView,
    OtherUserProfileView,
} from '../index';
import {useSelector} from 'react-redux';
import MessagesView from '../MessagesView/MessagesView';

function TuiterView() {
    const error = useSelector((state) => state.error.data);
    return (
        <div className='container'>
            <div className='ttr-tuiter'>
                <div className='ttr-left-column'>
                    <Navigation/>
                </div>
                <div className='ttr-center-column'>
                    <Routes>
                        <Route path='/' element={<HomeView/>}/>
                        <Route path='/tuiter' element={<HomeView/>}/>
                        <Route path='/tuiter/:uid/*' element={<OtherUserProfileView/>}/>
                        <Route path='/home' element={<HomeView/>}/>
                        <Route path='/home/:uid' element={<HomeView/>}/>
                        <Route path='/explore' element={<ExploreView/>}/>
                        <Route path='/notifications' element={<NotificationsView/>}/>
                        <Route path='/bookmarks' element={<BookmarksView/>}/>
                        <Route path='/lists' element={<ListsView/>}/>
                        <Route path='/profile/*' element={<ProfileView/>}/>
                        <Route path='/more' element={<MoreView/>}/>
                        <Route path='/messages/*' element={<MessagesView/>}/>
                    </Routes>
                    {error && <AlertBox message={error}/>}
                </div>
                <div className='ttr-right-column'>
                    <WhatsHappeningView/>
                </div>
            </div>
        </div>
    );
}

export default TuiterView;
