

const OrderFilterByDate = ({ dateRange, setDateRange , onFilterSubmit }) => {

    return (
        <form onSubmit={onFilterSubmit} className="row g-3 mb-4">
  <div className="col-auto">
    <label htmlFor="start-date" className="form-label">
      Start date
    </label>
    <input
      id="start-date"
      type="date"
      className="form-control"
      value={dateRange.startDate}
      onChange={(event) =>
        setDateRange((current) => ({
          ...current,
          startDate: event.target.value,
        }))
      }
    />
  </div>

  <div className="col-auto">
    <label htmlFor="end-date" className="form-label">
      End date
    </label>
    <input
      id="end-date"
      type="date"
      className="form-control"
      value={dateRange.endDate}
      onChange={(event) =>
        setDateRange((current) => ({
          ...current,
          endDate: event.target.value,
        }))
      }
    />
  </div>

  <div className="col-auto align-self-end">
    <button type="submit" className="btn btn-primary">
      Apply filter
    </button>
  </div>
</form>
    )
}

export default OrderFilterByDate;