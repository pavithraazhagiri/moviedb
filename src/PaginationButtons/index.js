import './index.css'

const PaginationButtons = props => {
  const {pageNumber, disabledValue} = props
  const {increasePageNumber, decreasePageNumber} = props
  const onIncrease = () => {
    increasePageNumber()
  }
  const onDecrease = () => {
    decreasePageNumber()
  }
  return (
    <div className="pagination-buttons-container">
      <button type="button" onClick={onDecrease} disabled={disabledValue}>
        Prev
      </button>
      <p className="pagination-page-number">{pageNumber}</p>
      <button type="button" onClick={onIncrease}>
        Next
      </button>
    </div>
  )
}

export default PaginationButtons
