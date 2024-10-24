import PropTypes from 'prop-types'

const CommentForm = ({ id, text, onChange, placeholder, dataTestId }) => {
  
  return (
    <div className='w-full'>
      <textarea
        rows="5"
        value={text || ''}
        onChange={onChange}
        id={`comment-form-${id}`}
        name={`comment-form-${id}`}
        placeholder={placeholder}
        className='text-sm border border-brand-grey rounded-md w-full p-2'
        data-testid={dataTestId}
      ></textarea>
    </div>
  )
}

Comment.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  dataTestId: PropTypes.string,
}

export default CommentForm
