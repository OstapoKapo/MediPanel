import axios from 'axios';

export function parseAxiosError(error: unknown): string {
  let message = 'An unexpected error occurred.';

  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      const serverMessage = Array.isArray(error.response.data.message)
        ? error.response.data.message.join(', ')
        : error.response.data.message;
      message = serverMessage;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return message;
}