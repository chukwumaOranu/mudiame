const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const parseJson = async <T>(response: Response): Promise<T> => {
  const data = (await response.json()) as T & { message?: string };
  if (!response.ok) {
    throw new Error(data.message || 'Request failed.');
  }
  return data;
};

export const sendContactMessage = async (payload: {
  name: string;
  email: string;
  message: string;
}): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return parseJson<{ message: string }>(response);
};
