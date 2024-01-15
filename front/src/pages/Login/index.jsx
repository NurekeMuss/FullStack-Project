import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Navigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useForm} from 'react-hook-form'

import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth)

  const dispatch = useDispatch()
  const {register,
     handleSubmit,
     setError, 
     formState:{errors,isValid},
    } = useForm({
    defaultValues:{
      email:'nureke@test.ru',
      password:'123456',
    },
    mode: 'onChange'
  })

  const onSubmit = async (value)=>{
   const data = await dispatch(fetchAuth(value))
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
  console.log(errors, isValid)


  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        className={styles.field}
        label="E-Mail"
        error = {Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        type="email"
        {...register('email',{required:'Укажите почту'})}
        fullWidth
      />

      <TextField 
      className={styles.field} 
      label="Пароль"
      error = {Boolean(errors.email?.message)}  
      helperText={errors.password?.message}
      {...register('password',{required:'Укажите пароль'})}
      fullWidth
      />
     
      <Button  disabled = {!isValid} type="submit" size="large" variant="contained" fullWidth>
        Войти
      </Button>
      </form>
    </Paper>
  );
};


