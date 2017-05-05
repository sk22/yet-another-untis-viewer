export default async url => {
  try {
    const res = await fetch(url)
  } catch (err) {
    console.error(err)
  }
  console.log(res)
  debugger
}
