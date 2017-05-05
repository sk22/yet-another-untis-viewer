import padStart from 'lodash.padstart'
import pimpCode from './pimp-code'

const getUrl = ({ url, element, week, list }) => (
  `https://cors.now.sh/${url}/${padStart(week, 2, '0')}/` +
  `${list[0]}/${list[0]}${padStart(String(element), 5, '0')}.htm`
)

export default () => {
  let request
  return async ({ url, element, week, list }) => {
    if (!Number(element)) return null
    request = fetch(getUrl({ url, element, week, list }), { cache: 'no-cache' })
    const currentRequest = request
    try {
      const res = await currentRequest
      if (currentRequest !== request) return null
      const buffer = await res.arrayBuffer()
      const decoder = new TextDecoder('iso-8859-1')
      return pimpCode(decoder.decode(buffer))
    } catch (err) {
      if (currentRequest !== request) return null
      console.error(err)
      return 'Could not fetch the requested timetable.'
    }
  }
}
