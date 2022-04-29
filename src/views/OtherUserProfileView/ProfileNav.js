import { NavLink } from 'react-router-dom';

/**
 * 
 * @param {string} uid The uid of the user whos navigation panel should be loaded  
 * @returns a view of the navigation tab, allowing the user to select which page of their profile they are currently looking at.
 */
const ProfileNav = ({ uid }) => {
  const navItems = [
    {
      title: 'Tuits',
      link: `/tuiter/${uid}/tuits`,
    },
    { title: 'Likes', link: `/tuiter/${uid}/likes` },
    { title: 'Dislikes', link: `/tuiter/${uid}/dislikes` },
    // The final two pages are currently unimplemented so their links just go back to the current page
    { title: 'Tuits and Replies', link: `/tuiter/${uid}/tuits_and_replies` },
    { title: 'Media', link: `/tuiter/${uid}/media` },
  ];
  return (
    <ul className='mt-4 nav nav-pills nav-fill'>
      {navItems.map((item) => (
        <li key={item.link} className='nav-item'>
          <NavLink to={item.link} className='nav-link'>
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default ProfileNav;
