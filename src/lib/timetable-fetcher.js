import padStart from 'lodash.padstart'

const getUrl = ({ url, element, week, list }) => (
  `https://cors.now.sh/${url}/${padStart(week, 2, '0')}/` +
  `${list[0]}/${list[0]}${padStart(String(element), 5, '0')}.htm`
)

export default () => {
  let request
  return async ({ url, element, ...rest }) => {
    if (!Number(element)) return null
    request = fetch(getUrl({ url, element, ...rest }))
    const currentRequest = request
    const res = await currentRequest
    if (currentRequest !== request) {
      console.warn('Requests do not match')
      return null
    }
    const buffer = await res.arrayBuffer()
    const decoder = new TextDecoder('iso-8859-1')
    return decoder.decode(buffer)
  }
}
