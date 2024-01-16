import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';//для редактора 
import { useNavigate,Navigate } from "react-router-dom";
import {useSelector} from 'react-redux'

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { selectIsAuth } from "../../redux/slices/auth";
import axios from '../../axios';

export const AddPost = () => {
  const navigate = useNavigate()

  const isAuth = useSelector(selectIsAuth)

  const [text, setText] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [tittle, setTittle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setimageUrl] = React.useState('');
  const inputFileRef = React.useRef(null)

  const handleChangeFile = async (event) => {
    try{
      const formData = new FormData()
      const file = event.target.files[0];
      formData.append('image', file)
      const {data } = await axios.post('/upload', formData) 
      console.log(data)
      setimageUrl(data.url)
    }catch(err){
      console.warn(err)
      alert("Ошибка при загурузке файла ")
    }
  };

  const onClickRemoveImage = async (value) => {
    setimageUrl('')
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSumbit = async () => {
    try{
      setLoading(true)

      const fields = {
        tittle,
        imageUrl,
        tags:tags.split(','),
        text
      }
      //передача на бэк 

      const {data} = await axios.get('/posts', fields)

      const id = data._id
      navigate(`/posts/${id}`)
    }catch(err){
      console.warn(err)
      alert("ошибка при создание статьи ")
    }
  }

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );
  if(!window.localStorage.getItem('token') && !isAuth){
    return <Navigate to = '/'/> 
  }
  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref ={inputFileRef } type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
         <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
         <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>

      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value = {tittle}
        onChange={e => setTittle(e.target.value)}
        fullWidth
      />
      <TextField 
      classes={{ root: styles.tags }} 
      variant="standard" 
      value = {tags}
      onChange={e => setTags(e.target.value)}
      placeholder="Тэги" 
      fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSumbit} size="large" variant="contained">
          Опубликовать
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
