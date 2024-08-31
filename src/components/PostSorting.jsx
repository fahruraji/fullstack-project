import PropTypes from 'prop-types'

export function PostSorting({
  fields = [],
  value,
  onChange,
  orderValue,
  onOrderChange,
}) {
  return (
    <div className='row g-3 align-items-center'>
      <div className='col-auto'>
        <label htmlFor='sortBy' className='col-form-label'>
          Sort By:{' '}
        </label>
      </div>
      <div className='col-auto'>
        <select
          className='form-select'
          name='sortBy'
          id='sortBy'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {fields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>

      <div className='col-auto'>
        <label htmlFor='sortOrder' className='col-form-label'>
          Sort Order:{' '}
        </label>
      </div>
      <div className='col-auto'>
        <select
          className='form-select'
          name='sortOrder'
          id='sortOrder'
          value={orderValue}
          onChange={(e) => onOrderChange(e.target.value)}
        >
          <option value={'ascending'}>ascending</option>
          <option value={'descending'}>descending</option>
        </select>
      </div>
    </div>
  )
}

PostSorting.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  orderValue: PropTypes.string.isRequired,
  onOrderChange: PropTypes.func.isRequired,
}
