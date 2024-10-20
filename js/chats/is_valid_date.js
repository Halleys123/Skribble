function is_valid_date(time) {
  if (isNaN(Date.parse(time))) {
    return false;
  }
  return true;
}

export { is_valid_date };
