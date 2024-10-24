import PropTypes from 'prop-types'

const ActionButton = ({ btnClassNames, disabled, onClick, children, dataTestId }) => {
  
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${btnClassNames} text-xxs-10 flex items-center disabled:text-brand-grey-light`}
      data-testid={dataTestId}
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
  dataTestId: PropTypes.string,
}

export default ActionButton
