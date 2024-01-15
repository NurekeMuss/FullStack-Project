import React from 'react';
import { Link } from 'react-router-dom';/* routning чтоб браузер не перезгружался */
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from 'react-redux'

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {logout,selectIsAuth } from "../../redux/slices/auth";

export const Header = () => {
  /* Login */
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)

  const onClickLogout = () => {
    if(window.confirm('Are you sure you want to log')){
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
  };
  /* End login part */

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Nuradil BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/posts/create">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
