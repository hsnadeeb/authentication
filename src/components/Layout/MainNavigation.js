import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';
import { useNavigate } from 'react-router-dom';

const MainNavigation = () => {
   
  const navigate = useNavigate();

    const authCtx = useContext(AuthContext);
    console.log(authCtx);
    const isLoggedIn = authCtx.isLoggedIn;
    const logoutHandler = () => {
      authCtx.logout(); 
      navigate('/auth'); 
    };
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn &&(
          <li>
          <Link to='/auth'>Login</Link>
        </li>
          )}
          {isLoggedIn && (
             <li>
             <Link to='/profile'>Profile</Link>
           </li>
 
          )}
         {isLoggedIn && (
          <li>
          <button onClick={logoutHandler}><Link to='/'>Logout</Link></button>
        </li>

         )}
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
