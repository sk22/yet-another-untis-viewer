export const save = state => {
  sessionStorage.setItem('state', JSON.stringify(state))
}

export const load = () => {
  const string = sessionStorage.getItem('state')
  if (string === 'undefined') return null
  return JSON.parse(string)
}
