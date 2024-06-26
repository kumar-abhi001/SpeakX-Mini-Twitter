const asyncHandler = (fnc) => async (req, res, next) => {
  try {
    return await fnc(req, res, next);
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).json({
      success: false,
      message: error.message,
    });
  }
};

export { asyncHandler };