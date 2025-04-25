export const tryCatch = async (fn: Function, message = 'Error', ...args: any[]): Promise<any> => {
  try {
    return await fn(...args);
  } catch (error) {
    console.log(message, error);
    return { error: 'Internal Server Error', status: 500 };
  }
};
