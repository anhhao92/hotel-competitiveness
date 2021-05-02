const customFetch = async (url, options = { method: 'GET' }) => {
  const response = await fetch(url, options)
  const parsedResponse = await response.text().then((text) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      return {}
    }
  })

  if (!response.ok) {
    throw parsedResponse
  }
  return await parsedResponse
}

export default customFetch
