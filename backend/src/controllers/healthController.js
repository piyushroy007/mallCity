const catchAsync = require('../utils/catchAsync');

const getHealth = catchAsync(async (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

module.exports = {
  getHealth,
};

