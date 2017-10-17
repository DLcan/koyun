export default (value) => {
  const date = new Date(value)
  return date.toLocaleString(['tr-TR'], {day: '2-digit', month: '2-digit', year: 'numeric'})
}
