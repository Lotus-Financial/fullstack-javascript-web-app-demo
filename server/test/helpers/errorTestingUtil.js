module.exports = async (func, ...args) => {
  try {
    const result = await func(...args);
    return result;
  } catch (e) {
    return e;
  }
}
