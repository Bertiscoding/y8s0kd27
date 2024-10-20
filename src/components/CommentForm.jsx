const CommentForm = ({id, text, onChange, placeholder}) => {
  
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
      ></textarea>
    </div>
  )
}

export default CommentForm
