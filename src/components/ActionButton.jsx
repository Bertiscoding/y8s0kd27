import PropTypes from 'prop-types'

const ActionButton = ({ btnClassNames, disabled, onClick, children }) => {
  
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${btnClassNames} text-xxs-10 flex items-center disabled:text-brand-grey-light`}
    >
      {children}
  </button>
  )
}

ActionButton.propTypes = {
  btnClassNames: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default ActionButton
