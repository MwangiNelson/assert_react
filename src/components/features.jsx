import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../Contexts/AuthContext'
import { Link } from 'react-router-dom'
import './loader.css'
import axios from 'axios'

export const ProtestCard = (props) => {

    return (
        <div className={`${props.selected == props.index ? 'w-100' : 'w-50'} p-3 d-flex flex-row`}>
            <div className={`btn rounded-1 bg-light border p-0 w-100 d-flex flex-row rounded`} >
                <img src="images/demos.jpg" alt="" className={`${props.selected == props.index ? 'w-25' : 'w-50'} rounded-1 img-cover `} />
                <div className="w-75 ais d-flex flex-column p-4">
                    <div className="w-100 d-flex flex-row border-0 border-bottom border-2 border-dark aic justify-content-between">
                        <h2 className="fs-2 text-uppercase text-bold p-0 m-0 tas">{props.title.toString().toLowerCase()}</h2>
                    </div>

                    <div className="d-flex flex-row w-100 pt-3">
                        <div className={`${props.selected == props.index ? 'w-25' : 'w-100'}  w-50 d-flex flex-column`}>
                            <h4 className='text-capitalize d-flex gap-1'>Venue <b className='font-primary text-primary text-bold'>:</b> <b className='text-primary'>{props.venue.toString().toLowerCase()}</b></h4>
                            <h4 className='text-capitalize d-flex gap-1'>Date <b className='font-primary text-primary text-bold'>:</b> <b className='text-primary justify-content-center d-flex'>{props.date}</b></h4>
                            <div className="w-100 d-flex gap-2 flex-row">
                                <Link to={`/protests/${props.protest_id}`}>
                                    <button
                                        className={`btn gap-4 rounded-1 p-2 px-3 m-0 d-flex jcc aic w-100 btn-outline-success`}
                                    >
                                        SHOW MORE
                                        <i className="fa-solid fa-angle-right fs-5"></i>
                                    </button>
                                </Link>

                            </div>
                        </div>

                    </div>



                </div>

            </div>
        </div >
    )
}

export const Loader = () => {
    return (
        <div className="w-100 py-3 d-flex justify-content-center align-items-center">
            <div className="lds-facebook lds-facebook-white"><div></div><div></div><div></div></div></div >
    )
}

export const LoaderGreen = () => {
    return (
        <div className="w-100 py-3 d-flex justify-content-center align-items-center">
            <div className="lds-facebook lds-facebook-green"><div></div><div></div><div></div></div></div >
    )
}

export const PhotoLoader = ()=>{
    return(
        <div className="rounded-1 w-100 d-flex jcc aic bg-blur bg-semi-dark h-100 position-absolute z-top">
            <div className="loader"></div>
        </div>
    )
}

export const ProtestPost = (props) => {
    return (
        <div className="w-100 position-fixed bg-blur vh-100 top-0 start-0 d-flex jcc aic">
            <div className="p-4 d-flex flex-column gap-2 w-25 shadow-lg animate-in bg-light rounded-1 border-1">
                <div className="d-flex jsb aic w-100 border-0 border-bottom border-dark flex-row">
                    <h1 className="text-dark fs-2 ">
                        COMMENT & POST
                    </h1>
                    <button className="btn btn-dark px-2 p-0"
                        onClick={() => { props.closeMethod() }}
                    >
                        <i className="fa-solid fa-xmark fs-2"></i>
                    </button>
                </div>
                <div className="w-100 border border-dashed border-primary rounded-1 p-2 vh-25 d-flex flex-column jcc aic">
                    <i className="fa-solid fa-plus text-primary fs-2"></i>
                    <h3 className="fs-3 text-primary">Post a photo</h3>
                </div>
                <div className="w-100 d-flex flex-column">
                    <label htmlFor="" className="font-tertiary text-secondary">Post your comment on the protest below</label>
                    <textarea id="" cols="30" rows="3" className='form-control'></textarea>
                </div>
                <button className="btn btn-primary w-50">POST</button>

            </div>
        </div>
    )
}

export const CommentCard = (props) => {
    const [editMode, setEditMode] = useState(false)

    function formatDateTime(datetime) {
        const formattedDate = new Date(datetime).toLocaleDateString();
        const formattedTime = new Date(datetime).toLocaleTimeString([], {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });

        return `${formattedDate} (${formattedTime})`;
    }

    console.log(props.comment_id)
    return (
        <div className="w-100 d-flex flex-row">
            {editMode ? <CommentEditCard
                comment={props.comment}
                fetchMethod={props.fetchMethod}
                toggleMethod={() => { setEditMode(!editMode) }}
                protest_id={props.protest_id}
                comment_id={props.comment_id}
            /> : null}
            <div className="d-flex flex-row ais gap-4 border p-2 ps-3 btn btn-light jcs rounded-1">
                <img src="/images/chat.png" alt="" className='user-img' />

                <div className="d-flex flex-column">
                    <p className='fs-4 text-secondary m-0 p-0 tas'>{props.comment}</p>
                    <p className='font-tertiary w-100 d-flex flex-row-reverse pe-4'>Posted on {formatDateTime(props.date)}</p>
                </div>
            </div>
            {
                props.isAuthor ?
                    <div className="d-flex flex-column-reverse px-3 gap-2">
                        <button className="btn btn-danger rounded-1"
                            onClick={props.deleteMethod}
                        ><i className="fa-solid fa-trash-can p-0 m-0 fs-4"></i></button>
                        <button
                            className="btn btn-warning rounded-1"
                            onClick={() => { setEditMode(!editMode) }}
                        ><i className="fa-solid fa-pen p-0 m-0 fs-4"></i></button>
                    </div> : null}
        </div>
    )
}

export const CommentForm = (props) => {

    const commentRef = useRef('')

    async function postComment(e, protest_id, fetchMethod) {
        e.preventDefault()

        const commentData = {
            protest_id: protest_id,
            comment: commentRef.current.value,
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/comment', commentData);
            alert('Comment posted successfully');
            commentRef.current.value = ''
            fetchMethod(protest_id)

        } catch (error) {
            console.log('Error posting comment:', error);
        }
    }

    return (
        <div className="w-100 d-flex jcc aic bg-blur vh-100 position-fixed top-0 start-0 animate-in">
            <div className="w-50 rounded bg-light p-4 shadow-lg d-flex flex-column">
                <div className="d-flex flex-row border-0 border-bottom border-dark mb-3 jsb aic pb-1">
                    <h1 className="fs-1 text-dark m-0">
                        COMMENT EDITOR
                    </h1>
                    <button
                        className="btn btn-dark rounded-1"
                        onClick={props.toggleMethod}
                    >
                        <img src="/images/cancel.png" className='inverted' alt="" />
                    </button>
                </div>
                <form className='w-100 d-flex flex-column gap-2' onSubmit={(e) => { postComment(e, props.protest_id, props.fetchMethod) }}>
                    <label htmlFor="" className='font-tertiary'>Post comment:</label>
                    <textarea ref={commentRef} rows="3" className='form-control fs-3' minLength={50} placeholder='Post your comment here' ></textarea>
                    <button className="btn btn-primary w-25 fs-4">POST COMMENT</button>
                </form>
            </div>
        </div>
    )
}

export const CommentEditCard = (props) => {

    const [comment, setComment] = useState(props.comment);
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    console.log('Comment Id',props.comment_id)
    async function editComment(e, protest_id, comment_id, fetchMethod) {
        e.preventDefault()

        const commentData = {
            id: comment_id,
            protest_id: protest_id,
            comment: comment,
            
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/editComment', commentData);
            alert('Comment posted successfully');
            fetchMethod(protest_id)

        } catch (error) {
            console.log('Error posting comment:', error);
        }
    }

    return (
        <div className="w-100 d-flex jcc aic bg-blur vh-100 position-fixed top-0 start-0 animate-in">
            <div className="w-50 rounded bg-light p-4 shadow-lg d-flex flex-column">
                <div className="d-flex flex-row border-0 border-bottom border-dark mb-3 jsb aic pb-1">
                    <h1 className="fs-1 text-dark m-0">
                        COMMENT EDITOR
                    </h1>
                    <button
                        className="btn btn-dark rounded-1"
                        onClick={props.toggleMethod}
                    >
                        <img src="/images/cancel.png" className='inverted' alt="" />
                    </button>
                </div>
                <form
                    className='w-100 d-flex flex-column gap-2'
                    onSubmit={
                        (e) => {
                            editComment(e, props.protest_id, props.comment_id, props.fetchMethod)
                        }}
                >
                    <label htmlFor="" className='font-tertiary'>Edit comment:</label>
                    <textarea
                        rows="3"
                        className='form-control fs-3'
                        onChange={handleCommentChange}
                        minLength={50}
                        value={comment} ></textarea>
                    <button className="btn btn-primary w-25 fs-4">SAVE <i className="fa-solid fa-floppy-disk ps-3"></i></button>
                </form>
            </div>
        </div>
    )
}
