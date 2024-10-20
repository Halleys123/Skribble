function extract_time(date) {
  let time = date.getHours() + ":" + date.getMinutes();
  return time;
}

export { extract_time };
