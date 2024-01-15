import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {useDispatch, useSelector} from 'react-redux'
import { Navigate } from "react-router-dom";
import {useForm} from 'react-hook-form'

import styles from './Login.module.scss';
import { fetchAuth, fetchRegistrer, selectIsAuth } from "../../redux/slices/auth";

export const Registration = () => {

  const isAuth = useSelector(selectIsAuth)

  const dispatch = useDispatch()
  const {register,
     handleSubmit,
     setError, 
     formState:{errors,isValid},
    } = useForm({
    defaultValues:{
      fullName: 'nureke',
      email:'nureke@test.ru',
      password:'123456',
    },
    mode: 'onChange'
  })

  
  const onSubmit = async (value)=>{
    const data = await dispatch(fetchRegistrer(value))
    if(!data.payload){
     return alert('cannot register')
    }
    if('token' in data.payload){
     window.localStorage.setItem('token', data.payload.token)
    }
   }

  if(isAuth){
    return <Navigate to = '/'/> 
  }


  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      
    <form onSubmit={handleSubmit(onSubmit)}>
    <TextField   error = {Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register('fullName',{required:'Укажите fullName'})}
         className={styles.field}
          label="Полное имя" 
          fullWidth />
      
      <TextField   error = {Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        type="email"
        {...register('email',{required:'Укажите почту'})}
         className={styles.field} 
         label="E-Mail" 
         fullWidth />
      
      <TextField   error = {Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        type="password"
        {...register('password',{required:'Укажите пароль'})}
         className={styles.field} 
         label="Пароль" 
         fullWidth />
      <Button type="submit"  disabled = {!isValid} size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
    </form>
    </Paper>
  );
};
