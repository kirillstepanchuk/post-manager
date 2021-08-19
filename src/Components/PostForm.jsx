import React, { useState } from 'react';

import MyButton from './UI/button/MyButton'
import MyInput from './UI/input/MyInput';

const PostForm = ({create}) => {
    const [post, setPost] = useState({title: '', body: ''});

    const addNewPost = (evt) => {
    evt.preventDefault();
    const newPost = {...post, id: Date.now()};
    create(newPost);
    setPost({title: '', body: ''});
    }
    
    return (
        <form>
            <MyInput 
                onChange={evt => setPost({...post, title: evt.target.value})} 
                value={post.title} 
                type="text" 
                placeholder='Название поста'
            />
            <MyInput 
                onChange={evt => setPost({...post, body: evt.target.value})} 
                value={post.body} 
                type="text" 
                placeholder='Описание поста'
            />
            <MyButton onClick={addNewPost}>
                Создать пост
            </MyButton>
        </form>
    )
}

export default PostForm;
