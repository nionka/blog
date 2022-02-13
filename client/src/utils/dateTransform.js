export default function dateTransform(date) {
  const newDate = new Date(date);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  const dateFormat = new Intl.DateTimeFormat('ru', options).format(newDate);

  return dateFormat;
}
