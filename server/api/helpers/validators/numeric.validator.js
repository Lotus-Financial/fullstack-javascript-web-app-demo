const isPositiveInteger = (num) => {
  var n = Math.floor(Number(num));
  return n !== Infinity && String(num) === String(num) && n > 0;
}

module.exports = {
  isPositiveInteger
}
