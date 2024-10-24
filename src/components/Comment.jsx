import { useState } from 'react'
import PropTypes from 'prop-types'
import { useComments } from '../context/CommentsContext'
import CommentItem from './CommentItem'
import CommentReply from './CommentReply'
import ActionButton from './ActionButton'

const Comment = ({
  id,
  text,
  createdOn,
  edited,
  replies,
  authorFirstName,
  authorLastName,
  authorId,
}) => {
  const { deleteComment, addReply, updateComment, isAuthor } = useComments()
  const [repliesOpen, setRepliesOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [replyMode, setReplyMode] = useState(false)
  const [updatedText, setUpdatedText] = useState(text)

  const disabledBtn = isAuthor(authorId)

  const toggleReplies = () => setRepliesOpen(prev => !prev)
  const handleSetEditMode = () => setEditMode(true)

  const handleSaveEdit = () => {
    if (updatedText.trim() && updatedText !== text) {
      updateComment(id, updatedText.trim())
    }
    setEditMode(false)
  }

  const handleSetReplyMode = () => setReplyMode(prev => !prev)
  const handleDelete = () => deleteComment(id)

  const handleTextChange = (newText) => setUpdatedText(newText)

  const handleAddReply = (replyText) => {
    if (replyText.trim()) {
      addReply(id, replyText.trim())
      setReplyMode(false)
    }
  }

  return (
    <div className='mb-5'>
      <CommentItem
        id={id}
        editMode={editMode}
        text={updatedText}
        authorFirstName={authorFirstName}
        authorLastName={authorLastName}
        authorId={authorId}
        createdOn={createdOn}
        edited={edited}
        onChangeText={handleTextChange}
        itemWidth="w-[348px]"
      />
      <ActionButtons
        editMode={editMode}
        disabledBtn={disabledBtn}
        handleSetReplyMode={handleSetReplyMode}
        handleDelete={handleDelete}
        handleSaveEdit={handleSaveEdit}
        handleSetEditMode={handleSetEditMode}
        toggleReplies={toggleReplies}
        repliesOpen={repliesOpen}
        replies={replies}
      />

      {replyMode && (
        <CommentReply
          replyMode={replyMode}
          onAddReply={handleAddReply}
        />
      )}

      {replies && replies.length > 0 && repliesOpen && (
        replies.map((reply) => (
          <CommentReply
            key={reply.id}
            reply={reply}
            replyMode={replyMode}
            onAddReply={handleAddReply}
            onDeleteComment={handleDelete}
            onUpdateComment={handleSaveEdit}
          />
        ))
      )}
    </div>
  )
}

const ActionButtons = ({
  editMode,
  disabledBtn,
  handleSetReplyMode,
  handleDelete,
  handleSaveEdit,
  handleSetEditMode,
  toggleReplies,
  repliesOpen,
  replies,
}) => (
  <div className='w-full flex justify-end'>
    <div className='w-[348px] flex justify-between mt-2 px-4'>
      <div className='text-xxs-10 flex'>
        <ActionButton
          btnClassNames="text-brand-primary w-16"
          disabled={editMode}
          onClick={handleSetReplyMode}
          dataTestId="addReplyButton"
        >
          <span className='mr-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3" transform="scale(1, -1)">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
            </svg>
          </span>
          <span>Reply</span>
        </ActionButton>

        <ActionButton
          onClick={handleDelete}
          disabled={!disabledBtn || editMode}
          btnClassNames="text-brand-primary w-16"
          dataTestId="deleteCommentButton"
        >
          <span className='mr-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </span>
          <span>Delete</span>
        </ActionButton>

        {editMode ? (
          <ActionButton
            btnClassNames="text-brand-primary w-16"
            onClick={handleSaveEdit}
            dataTestId="saveUpdatedCommentButton"
          >
            <span className='mr-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </span>
            <span>Save</span>
          </ActionButton>
        ) : (
          <ActionButton
            btnClassNames="text-brand-primary w-16"
            disabled={!disabledBtn}
            onClick={handleSetEditMode}
            dataTestId="updateCommentButton"
          >
            <span className='mr-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </span>
            <span>Edit</span>
          </ActionButton>
        )}
      </div>

        {replies && replies.length > 0 && (
          <ActionButton
            btnClassNames="text-brand-primary-dark"
            disabled={false}
            onClick={toggleReplies}
          >
            <span className='mr-1'>
              {repliesOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3" transform="scale(1, -1)">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25" />
                </svg>
              )}
            </span>
            <p>{replies.length === 1 ? `${replies.length} reply` : `${replies.length} replies`}</p>
          </ActionButton>
        )}
    </div>
  </div>
)

Comment.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  createdOn: PropTypes.string,
  edited: PropTypes.bool,
  replies: PropTypes.array,
  authorFirstName: PropTypes.string,
  authorLastName: PropTypes.string,
  authorId: PropTypes.number,
}

export default Comment
