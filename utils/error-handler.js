export async function handler(response) {

  try {
    if (response.status === 500) {
      throw new Error('internalServerError')
    }
    if (response.status === 400) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en la solicitud');
    }
    if (response.status === 401) {
      throw new Error('Unauthorized')
    }
    
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error)
    }

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
