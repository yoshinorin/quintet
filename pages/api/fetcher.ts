export async function fetcher(url: string) {
  const response = await fetch(
    `${url}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return response.json();
}
