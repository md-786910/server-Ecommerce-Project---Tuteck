module.exports = {
  success: (status, { ...res }) => {
    res.status(status).json({ res });
  },
  error: (status, { ...res }) => {
    res.status(status).json({ res });
  },
};
