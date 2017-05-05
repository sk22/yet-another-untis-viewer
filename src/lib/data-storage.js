export const save = state => {
  localStorage.setItem('state', JSON.stringify(state))
}

export const load = () => {
  const string = localStorage.getItem('state')
  if (string === 'undefined') return null
  return JSON.parse(string)
}
