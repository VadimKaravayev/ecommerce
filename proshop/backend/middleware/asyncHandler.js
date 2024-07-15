export default function asyncHandler(fn) {
  return (req, res, next) => {
    //next is an error handling middleware
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
