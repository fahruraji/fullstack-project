import PropTypes from 'prop-types'

export function PostFilter({ field, value, onChange }) {
  return (
    <div className='row g-3 align-items-center'>
      <div className='col-auto'>
        <label className='col-form-label' htmlFor={`filter-${field}`}>
          Filter By:{' '}
        </label>
      </div>
      <div className='col-auto'>
        <input
          type='text'
          className='form-control'
          name={`filter-${field}`}
          id={`filter-${field}`}
          placeholder={`${field}'s name`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}

PostFilter.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
