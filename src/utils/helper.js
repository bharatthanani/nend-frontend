export function formatDate(date) {
  if (!date) return '';

  return new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}


export function formatTime(timeString) {
  if (!timeString) return '';

  const [hours, minutes] = timeString.split(':');

  let hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12;
  hour = hour ? hour : 12;

  return `${String(hour).padStart(2, '0')}:${minutes} ${ampm}`;
}