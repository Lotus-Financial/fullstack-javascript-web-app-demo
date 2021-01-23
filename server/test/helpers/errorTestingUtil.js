module.exports = async (func, ...args) => {
  try {
    await func(...args);
  } catch (e) {
    return e;
  }
}
