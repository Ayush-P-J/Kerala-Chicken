export const errorMessage = (error) => {
  let message = "An unexpected error occurred";
  if (error.response) {
    message = error.response.data?.message || `Error: ${error.response.status}`;
  } else if (error.request) {
    message = "No response from server. Please check your connection.";
  } else {
    message = error.message || "Request failed.";
  }
  return message;
};
