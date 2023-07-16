import React, { useState, useEffect, useContext, useRef } from 'react'

import { useParams, Link } from 'react-router-dom'
import { AppContext } from '../Contexts/AuthContext'
import { CommentCard, CommentForm, PhotoLoader } from '../components/features'

import axios from 'axios'
import uploadPhotoSyntax from '../upload';

function ProtestView() {

  const [isVolunteer, setIsVolunteer] = useState(false)
  const [isAuthor, setIsAuthor] = useState(false)
  const { userData, isAuthenticated } = useContext(AppContext)
  const { protestId } = useParams()
  const [protest, setProtest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [photoLoading, setPhotoLoading] = useState(false)
  const [commentMode, setCommentMode] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('');
  const [assigned, setAssigned] = useState(false)
  const imageRef = useRef(null)

  const fetchProtest = async (protestId) => {

    const url = `http://127.0.0.1:8000/api/protest/${protestId}`;
    try {
      const response = await axios.get(url);
      const data = response.data.protest;
      setProtest(data);
      console.log('Protest fetch successful:', data);
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false)
    }
  };

  const isPosted = async () => {
    if (isVolunteer) {
      try {

        const requestData = {
          protest_id: protestId,
          volunteer_id: userData.user_token
        }
        const response = await axios.post(`http://127.0.0.1:8000/api/checkRequest`, requestData);
        (response.data.data == 1) ? setAssigned(true) : setAssigned(false)
        console.log('Posted state', assigned)

      } catch (error) {
        console.error()
      }
    }
  }

  const alertAuth = async () => {
    if (isVolunteer || isAuthor) {
      try {

        const requestData = {
          protest_id: protestId,
          volunteer_id: userData.user_token
        }
        const response = await axios.post(`http://127.0.0.1:8000/api/alert`, requestData);
        alert(response.data.message)

      } catch (error) {
        console.error()
      }
    }
  }
  const volunteerAsUsher = async (protestId) => {
    if (!isVolunteer) {
      return
    }

    const url = `http://127.0.0.1:8000/api/volunteer/usher`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          volunteer_id: userData.user_token,
          protest_id: protestId
        })
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message)

      } else {
        console.log('Data could not be fetched.');
        return false;
      }
    } catch (error) {
      console.log('Error:', error);
      return false;
    }
  }

  const cancelVolunteer = async () => {
    if (isVolunteer) {
      try {

        const requestData = {
          protest_id: protestId,
          volunteer_id: userData.user_token
        }
        const response = await axios.post(`http://127.0.0.1:8000/api/cancelVolunteer`, requestData);
        isPosted()

      } catch (error) {
        console.error()
      }
    }
  }

  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/comment/${commentId}`);
      alert('Comment deleted successfully');
      fetchProtest(protestId)

    } catch (error) {
      console.log('Error posting comment:', error);
    }
  }

  const deletePhoto = async (photoId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/photo/${photoId}`);
      alert('Photo deleted successfully');
      fetchProtest(protestId)

    } catch (error) {
      console.log('Error posting comment:', error);
    }
  }

  const checkIsAuthor = () => {
    (protest !== null && protest.author_token == userData.user_token) ? setIsAuthor(true) : setIsAuthor(false);
    (userData !== null && userData.user_privileges == 'volunteer') ? setIsVolunteer(true) : setIsVolunteer(false)
    console.log(isAuthor);
  }

  async function uploadPhoto() {
    const imageFile = imageRef.current.files[0];
    const fileName = imageFile.name;
    setPhotoLoading(true)
    try {
      const imgUrl = await uploadPhotoSyntax(imageFile, fileName);

      if (imgUrl) {
        try {
          const photoData = {
            img_url: imgUrl,
            protest_id: protestId
          }
          const response = await axios.post(`http://127.0.0.1:8000/api/photo`, photoData);
          alert('Photo uploaded successfully');
          setPreviewUrl('')
          fetchProtest(protestId)
          setPhotoLoading(false)

        } catch (err) {
          console.log('Error uploading image:', err);
          setPhotoLoading(false)
        }
      }

      // Perform any further actions with the image URL as needed
    } catch (error) {
      console.log('Error uploading image:', error);
      // Handle the error condition as needed
      setPhotoLoading(false)
    }
  }
  useEffect(() => {
    fetchProtest(protestId)
  }, [])

  useEffect(() => {
    (userData !== null && userData.user_privileges == 'volunteer') ? setIsVolunteer(true) : setIsVolunteer(false);
    (userData !== null) ? checkIsAuthor() : null;
    (userData !== null) ? isPosted() : null;

  }, [protest])

  function triggerFileInput() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
  }
  const handleFileInputChange = () => {
    const file = imageRef.current.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  return (
    <div className="w-100 vh-100-min d-flex flex-column bg-light aic">
      {commentMode ? <CommentForm
        toggleMethod={() => { setCommentMode(!commentMode) }}
        protest_id={protestId}
        fetchMethod={fetchProtest}
      /> : null}

      {
        loading == false ?
          <div className="w-100 bg-secondary py-3 jcc aic d-flex flex-column">
            <h1 className="display-1 text-dark text-bold pt-4 mb-0">
              {protest.title}
            </h1>
            <div className=" d-flex flex-column btn btn-outline-dark w-25 p-2 px-4">
              <span className='d-flex flex-row gap-1 font-tertiary jcc aic'>Posted by : <p className='fs-3 m-0 p-0'> {protest.author}</p> </span>
              <span className='d-flex flex-row gap-1 font-tertiary jcc aic'>Venue: <p className='fs-4 m-0 p-0'> {protest.venue}</p> </span>
              <span className='d-flex flex-row gap-1 font-tertiary jcc aic'>  Protest Date: <p className='fs-4 m-0 p-0'> {protest.event_date}</p> </span>
            </div>
            <div className="w-50 d-flex flex-row py-3 jcc gap-2">
              {
                isAuthenticated && !isAuthor && !isVolunteer ?
                  <button className="btn btn-success shadow-lg w-25 px-4 py-2 rounded-1 font-tertiary text-bold shadow-light fs-5">
                    SUBSCRIBE
                    <i className="fa-regular fa-calendar-plus ps-3"></i>
                  </button> : null}
              {
                isAuthor ?
                  <button className="btn btn-danger px-4 py-2 rounded-1 font-tertiary text-bold border-light fs-5">
                    DELETE PROTEST
                    <i className="fa-regular fa-calendar-plus ps-3"></i>
                  </button> : null
              }
              {
                isAuthor || isAuthenticated ?
                  <button
                    className="btn btn-warning px-4 py-2 rounded-1 font-tertiary text-bold border-light fs-5"
                    onClick={() => { setCommentMode(!commentMode) }}
                  >
                    POST COMMENT
                    <i className="fa-regular fa-calendar-plus ps-3"></i>
                  </button> : null
              }
              {
                isVolunteer && !assigned ?
                  <button
                    className="btn btn-info px-4 py-2 rounded-1 font-tertiary text-bold shadow-lg fs-5"
                    onClick={() => volunteerAsUsher(protestId)}
                  >
                    VOLUNTEER TO USHER
                    <i className="fa-regular fa-calendar-plus ps-3"></i>
                  </button> : null
              }
              {
                isVolunteer && assigned ?
                  <button
                    className="btn btn-danger px-4 py-2 rounded-1 font-tertiary text-bold shadow-lg fs-5"
                    onClick={() => cancelVolunteer()}
                  >
                    CANCEL VOLUNTEER REQUEST
                    <i className="fa-regular fa-trash-can ps-3"></i>
                  </button> : null
              }
              {
                isVolunteer && assigned || isAuthor ?
                  <button
                    className="btn btn-danger px-4 py-2 rounded-1 font-tertiary text-bold shadow-lg fs-5"
                    onClick={() => alertAuth()}
                  >
                    ALERT WARNING
                    <i className="fa-solid fa-warning ps-3"></i>
                  </button> : null
              }
            </div>
          </div> : null
      }
      <div className="w-75 d-flex flex-column p-4">
        <div className="d-flex flex-column">
          <h2 className="fs-1 border-0 border-bottom py-3 border-2">EVENT DESCRIPTION</h2>
          <p className='fs-5 text-dark font-tertiary'>{loading ? null : protest.description}</p>
        </div>

        {isAuthor ? <div className="w-100 py-4 d-flex flex-row gap-3">
          <input
            type="file"
            className='d-none'
            ref={imageRef}
            accept='image/*'
            id="fileInput"
            onChange={handleFileInputChange}
          />
          <div
            onClick={triggerFileInput}
            className="w-25 border border-dashed d-flex jcc aic flex-column vh-25 rounded-1 border-4 border-primary btn btn-outline-primary">
            <i className="fa-solid fa-plus fs-1"></i>
            <p className="fs-3">Add Image</p>
          </div>
          {previewUrl && (
            <div className="w-25 vh-25 d-flex position-relative">
              <img
                src={previewUrl}
                alt="Image Preview"
                className='w-100 img-cover rounded-1'
              />
              {photoLoading ? <PhotoLoader /> : null}
              <button
                onClick={uploadPhoto}
                className="btn btn-primary position-absolute bottom-0 end-0 m-2 font-tertiary jcc aic d-flex flex-row gap-3">
                SAVE
                <i className="fa-solid fa-floppy-disk fs-4"></i>
              </button>
              <button
                onClick={() => { setPreviewUrl('') }}
                className="btn btn-outline-danger shadow-lg position-absolute bottom-0 start-0 m-2 font-tertiary jcc aic d-flex flex-row gap-3">
                DISCARD
                <i className="fa-solid fa-ban fs-4"></i>
              </button>
            </div>
          )}
        </div> : null}
        <div className="d-flex w-100 py-4 flex-row gap-3">
          {
            protest !== null && protest.photos.length !== 0 ?
              protest.photos.map((photo) => {
                return (
                  <div className="w-25 p-25 position-relative">
                    <img src={photo.image_url} alt="" className="w-100 vh-25 rounded-1 img-cover" />
                    {isAuthor ? <button
                      onClick={() => { deletePhoto(photo.id) }}
                      className="btn btn-danger shadow-lg position-absolute bottom-0 end-0 m-2 font-tertiary jcc aic d-flex flex-row gap-3">
                      DELETE
                      <i className="fa-solid fa-trash-can fs-4"></i>
                    </button> : null}
                  </div>
                )
              })
              : null
          }
        </div>

        <div className="d-flex flex-column bg-light text-dark rounded shadow-lg p-4">
          <h2 className="fs-1 border-0 border-bottom py-3 border-2">POSTS BY AUTHOR</h2>
          <div className="w-100 d-flex flex-column gap-3">
            {
              protest !== null && protest.comments.length !== 0 ?
                protest.comments.map((comment, index) => {

                  return (
                    <CommentCard
                      isAuthor={isAuthor}
                      comment={comment.comment}
                      key={index}
                      date={comment.created_at}
                      deleteMethod={() => { deleteComment(comment.id) }}
                      fetchMethod={fetchProtest}
                      protest_id={protestId}
                      comment_id={comment.id}
                    />
                  )
                }) :
                <div className="w-100 shadow-lg p-3 rounded-2 font-tertiary">
                  No comments available
                </div>

            }

          </div>
        </div>
      </div>

    </div>
  )
}

export default ProtestView