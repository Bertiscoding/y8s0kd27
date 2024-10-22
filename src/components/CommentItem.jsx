import PropTypes from 'prop-types'
import { format } from 'date-fns'
import CommentForm from './CommentForm'

const CommentItem = (
  {
    id,
    text,
    authorFirstName = 'Dan',
    authorLastName = 'Druff',
    edited,
    createdOn,
    itemWidth,
    editMode,
    onChangeText,
    isAuthor,
  }) => {
  
  const validDate = createdOn ? new Date(createdOn) : new Date()
  const formattedDate = isNaN(validDate) ? 'Invalid date' : format(validDate, 'dd.MM.yyyy hh:mm a')

  const isAuthorAvatar = isAuthor
    ? 'bg-brand-primary-dark border-brand-primary-dark text-brand-off-white'
    : 'bg-brand-primary-light border-brand-primary-light-II text-brand-primary-dark'

  const handleChange = (e) => onChangeText(e.target.value)

  return (
    <div className='flex'>
      <div className={`${isAuthorAvatar} rounded-full border w-9 h-9 flex justify-center items-center mr-2`}>
        <span className='font-bold text-sm'>
        {authorFirstName[0].toUpperCase()}{authorLastName[0].toUpperCase()}
        </span>
      </div>

      <div className={itemWidth}>
        <div id={id} className='bg-brand-off-white p-base pb-0 rounded-md'>
          <div className='flex justify-between text-xxs-10 font-light text-brand-grey mb-2'>
            <p>{authorFirstName}&nbsp;{authorLastName}</p>
            <p>{formattedDate}</p>
          </div>

          { editMode ? (
            <>
              <CommentForm
                id={id}
                text={text}
                onChange={handleChange}
              />
            </>
          ) : (
            <p className='text-sm'>{text}</p>
          )}

          <div className='flex justify-end h-base'>
            {edited && ( <p className='italic text-xxs-10 font-light text-brand-grey'>edited</p> )}
          </div>
        </div>
      </div>

    </div>
  )
}

CommentItem.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  authorFirstName: PropTypes.string,
  authorLastName: PropTypes.string,
  edited: PropTypes.bool,
  createdOn: PropTypes.string,
  itemWidth: PropTypes.string,
  editMode: PropTypes.bool,
  onChangeText: PropTypes.func,
  isAuthor: PropTypes.bool,
}

export default CommentItem

