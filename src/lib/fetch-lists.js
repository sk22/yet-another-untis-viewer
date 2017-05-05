const getListsFromNavbarHtml = html => {
  const regexp = /var (.+) = (\[.*\]);/g

  const matches = []
  let currentMatch

  // eslint-disable-next-line no-cond-assign
  while (currentMatch = regexp.exec(html)) matches.push(currentMatch)

  // matches = [
  //   ['...', 'classes', '[...]'],
  //   ['...', 'teachers', '[...]']
  // ]
  return matches.reduce((obj, match) => ({
    ...obj,
    [match[1]]: [
      { key: 0, name: 'choose...' },
      ...JSON.parse(match[2]).map((name, i) => ({ key: i + 1, name }))
    ]
  }), {})
}

export default async url => {
  if (!url) return null
  console.log(`https://cors.now.sh/${url}/frames/navbar.htm`)
  const res = await fetch(`https://cors.now.sh/${url}/frames/navbar.htm`)
  const navbar = await res.text()
  return getListsFromNavbarHtml(navbar)
}

