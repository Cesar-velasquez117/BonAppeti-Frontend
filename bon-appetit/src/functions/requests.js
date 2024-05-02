const backendUrl = 'http://localhost:3001';

export const fetchRating = async (url) => {
    try {
      // Realiza la solicitud al endpoint bring_rate del backend utilizando fetch
      const response = await fetch(`${backendUrl}/bring_rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }), // Envía la URL como cuerpo de la solicitud
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch rating');
      }
  
      // Parsea la respuesta como JSON y la devuelve
      return await response.json();
    } catch (error) {
      // Si ocurre un error durante la solicitud, lo maneja y lo relanza
      throw new Error(`Error fetching rating: ${error.message}`);
    }
  };