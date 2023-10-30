
import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context'
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef=useRef();
  const passwordInputRef=useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx=useContext(AuthContext);
  

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event)=>{
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    
    setIsLoading(true);
    if(isLogin){

      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyByjuoXwSWwV6I1mzgOxz2oisGVGT7Bn5U`, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            res.json().then((data) => {
              let errorMessage = 'Authentication Failed';
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              alert(errorMessage);
            });
          }
        })
        .then((data) => {
          if (data) {
            const token  = data.idToken;
            console.log('JWT (idToken):', token);
            authCtx.login(token)
            // localStorage.setItem('token', token);
            // const token = localStorage.getItem('token');
          }
        });
        

    }else{
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyByjuoXwSWwV6I1mzgOxz2oisGVGT7Bn5U',{
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => {
          setIsLoading(false);
          if(res.ok){

          }else{
            res.json().then(data=>{
              let errorMessage='Authentication Failed';
              if(data && data.error && data.error.message){
                errorMessage=data.error.message;
              }
               alert(errorMessage);
            });
          }
        });
    }
     
    emailInputRef.current.value = '';
    passwordInputRef.current.value = '';
    

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler} >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          {/* <button
            type='submit'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button> */}
          { !isLoading && <button type='submit' className={classes.toggle}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>}
          {isLoading && <p>Loading...</p>}
          <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
