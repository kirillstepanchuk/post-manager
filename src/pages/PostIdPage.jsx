import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService'
import Loader from '../Components/UI/loader/Loader';

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    })

    const [fetchCommetns, isCommentsLoading, commentsError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data);
    })

    useEffect(() => {
        fetchPostById(params.id);
        fetchCommetns(params.id);
    }, [])

    return (
        <div>
            <h1>Вы открыли страницу поста с ID: {params.id}</h1>
            
            {isLoading
                ?   <Loader />
                :   <div>{post.id}. {post.title}</div>
            }

            <h1>Комментарии</h1>
            
            {isCommentsLoading
                ?   <Loader />
                :   <div>
                    {comments.map(comment => 
                        <div style={{marginTop: '15px'}} key={comment.id}>
                            <h5>{comment.email}</h5>
                            <div>{comment.body}</div>
                        </div>    
                    )}
                </div>
            }
        </div>
    )
}

export default PostIdPage;