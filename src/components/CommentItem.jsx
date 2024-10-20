import PropTypes from 'prop-types'
import {format} from 'date-fns'


const CommentItem = (props) => {
  const {id, text, authorFirstName, authorLastName, edited, createdOn, itemWidth} = props

  return (
    <div className='flex'>
      <div className='bg-brand-primary-light rounded-full border border-brand-primary-light-II w-9 h-9 flex justify-center items-center mr-2'>
        <span className='text-brand-primary-dark font-bold text-sm'>
          {authorFirstName.substring(0,1).toUpperCase()}{authorLastName.substring(0,1).toUpperCase()}
        </span>
      </div>

      <div className={itemWidth}>
        <div id={id} className='bg-brand-off-white p-base pb-0 rounded-md'>
          <div className='flex justify-between text-xxs-10 font-light text-brand-grey mb-2'>
            <p>{authorFirstName}&nbsp;{authorLastName}</p>
            <p>{format(new Date(createdOn), 'dd.MM.yyyy hh:mm a')}</p>
          </div>
          <p className='text-sm'>{text}</p>
          <div className='flex justify-end h-base'>
            {edited && ( <p className='italic text-xxs-10 font-light text-brand-grey'>edited</p> )}
          </div>
        </div>
      </div>

    </div>
  )
}

CommentItem.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  authorFirstName: PropTypes.string,
  authorLastName: PropTypes.string,
  edited: PropTypes.bool,
  createdOn: PropTypes.string, // PropTypes.instanceOf(Date)
  replies: PropTypes.array,
  itemWidth: PropTypes.string,
}

export default CommentItem

