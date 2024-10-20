import CommentForm from './CommentForm'
import ActionButton from './ActionButton'
import { useState } from 'react'

const CommentCreateContainer = ({userName}) => {
  const [formOpen, setFormOpen] = useState(true)
  const [newComment, setNewComment] = useState({
    id: '',
    text: '',
    authorFirstName: userName.authorFirstName,
    authorLastName: userName.authorLastName,
    authorId: userName.id,
    edited: false,
    createdOn: '',
    replies: [],
  })

  const toggleForm = () => (setFormOpen(!formOpen))

  const handleFormChange = (e) => {
    setNewComment({
      ...newComment,
      text: e.target.value,
    })
  }

  const handleSaveNewComment = () => {
    setFormOpen(!formOpen)
  
    const newCommentWithId = {
      ...newComment,
      id: Date.now(),
      createdOn: new Date(),
    }
  
    let localStorageComments = JSON.parse(localStorage.getItem('comments'))
  
    if (!Array.isArray(localStorageComments)) {
      localStorageComments = []
    }
  
    localStorageComments.push(newCommentWithId)
    localStorage.setItem('comments', JSON.stringify(localStorageComments))
  
    setNewComment({
      id: '',
      text: '',
      authorFirstName: userName.authorFirstName,
      authorLastName: userName.authorLastName,
      authorId: userName.id,
      edited: false,
      createdOn: '',
      replies: [],
    })
  }
  

  return (
    <>
      <div className='h-[30px] flex items-end bg-gradient-to-t from-brand-primary-dark-II via-brand-primary-dark-II to-transparent pointer-events-none'>
        <ActionButton
          btnClassNames="text-brand-primary-dark w-22 h-4 pl-base"
          disabled={false}
          onClick={toggleForm}
        >
          <span className='mr-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3"
              transform={formOpen ? 'scale(1, 1)' : 'scale(1, -1)'}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
          <span>{formOpen ? 'Close' : 'Open'} form</span>
        </ActionButton>
      </div>
      {
        formOpen && (
          <div className='flex flex-col items-end p-base rounded-br-md rounded-bl-md justify-end bg-brand-primary-dark-II'>
            <div className="pb-base w-full">
              <CommentForm
                id={Date.now().toString()}
                text={newComment.text}
                placeholder='What is on your mind...'
                onChange={handleFormChange}
              />
            </div>
            <button
              disabled={!newComment.text}
              onClick={handleSaveNewComment}
              className='bg-brand-primary disabled:bg-brand-grey-light rounded-md text-white font-semibold fit-content px-5 py-3'>
              Post comment
            </button>
          </div>
        )
      }
    </>
  )
}

CommentCreateContainer.propTypes = {}

export default CommentCreateContainer
