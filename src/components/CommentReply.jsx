import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import { useComments } from '../context/CommentsContext'
import PropTypes from 'prop-types'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'
import ActionButton from './ActionButton'

const CommentReply = ({
  reply,
  replyMode,
  onAddReply,
  onUpdateComment,
  onDeleteComment,
}) => {
  const { user } = useUser()
  const { isAuthor } = useComments()
  const { id, authorFirstName, authorLastName, authorId, edited, createdOn } = reply || {}
  const [replyText, setReplyText] = useState(reply?.text || '')
  const [editMode, setEditMode] = useState(false)
  const [isEdited, setIsEdited] = useState(edited)

  useEffect(() => {
    if (reply) {
      setReplyText(reply.text)
      setEditMode(false)
    } else if (replyMode) {
      setReplyText('')
      setEditMode(false)
    } else {
      setReplyText('')
      setEditMode(false)
    }
  }, [reply, replyMode])

  const disabledBtn = isAuthor(authorId)
  const handleSetEditMode = () => setEditMode(true)
  const handleAddOrEdit = (e) => setReplyText(e.target.value)
  const handleDelete = () => onDeleteComment(reply?.id)

  const handleTextChange = (newText) => setReplyText(newText)

  const handleSaveReply = () => {
    if (!user || !replyText || !replyText.trim()) return
  
    if (reply && editMode) {
      setIsEdited(true)
      handleTextChange(replyText.trim())
      onUpdateComment(reply.id, replyText.trim())
      setEditMode(false)
    } else {
      onAddReply(replyText.trim())
      setReplyText('')
    }
  }

  return (
    <div id={id} className='flex justify-end mt-5'>
      <div>
        { editMode || replyMode ? (
          <CommentForm
            id={id}
            text={replyText}
            placeholder="Write a reply..."
            onChange={handleAddOrEdit}
            dataTestId="replyCreateFormInput"
          />
        ) : (
          <CommentItem
            id={id}
            editMode={editMode}
            text={replyText}
            authorFirstName={authorFirstName}
            authorLastName={authorLastName}
            authorId={authorId}
            createdOn={createdOn}
            edited={isEdited}
            onChangeText={setReplyText}
            itemWidth="w-[300px]"
          />
        )}

        <div className='w-full flex justify-end'>
          <div className='w-[300px] flex justify-between mt-2 px-4'>
            <div className='flex'>
              <ActionButton
                btnClassNames="text-brand-primary w-16"
                disabled={!disabledBtn || (editMode && reply)}
                onClick={handleDelete}
              >
                <span className='mr-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </span>
                <span>Delete</span>
              </ActionButton>

              { (editMode || replyMode) ? (
                  <ActionButton
                    btnClassNames="text-brand-primary w-22"
                    disabled={!replyText.trim()}
                    onClick={handleSaveReply}
                    dataTestId="saveReplyButton"
                  >
                    <span className='mr-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </span>
                    <span>{editMode ? 'Save Changes' : 'Add Reply'}</span>
                  </ActionButton>
                ) : (
                  <ActionButton
                    btnClassNames="text-brand-primary w-16"
                    disabled={!disabledBtn}
                    onClick={handleSetEditMode}
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
          </div>
        </div>
      </div>
    </div>
  )
}

CommentReply.propTypes = {
  reply: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    authorId: PropTypes.number,
    authorFirstName: PropTypes.string,
    authorLastName: PropTypes.string,
    edited: PropTypes.bool,
    createdOn: PropTypes.string,
  }),
  replyMode: PropTypes.bool,
  onUpdateComment: PropTypes.func,
  onDeleteComment: PropTypes.func,
  onAddReply: PropTypes.func,
}

export default CommentReply
