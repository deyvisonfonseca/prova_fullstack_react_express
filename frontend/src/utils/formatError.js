export function formatError(error) {
  const data = error?.response?.data;

  if (typeof data === 'string') {
    return data;
  }

  if (data?.message) {
    return data.message;
  }

  if (data?.error) {
    return data.error;
  }

  if (Array.isArray(data?.errors)) {
    return data.errors.join(', ');
  }

  return 'Ocorreu um erro ao executar a operação.';
}
