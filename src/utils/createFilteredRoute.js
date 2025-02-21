function createFilteredRoute(data, paramName = null) {
  return (req, res) => {
    const paramValue = paramName ? req.params[paramName] : null;
    let filteredData = data.filter(item => paramName ? item[paramName] === paramValue : true);

    if (filteredData.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Data not found' });
    }

    res.json({
      status: 'success',
      total: filteredData.length,
      data: filteredData,
    });
  };
}

module.exports = createFilteredRoute;