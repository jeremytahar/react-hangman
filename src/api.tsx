// src/api.tsx
export const fetchData = async () => {
  const response = await fetch('http://localhost:3333/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      locale: "fr-FR",
    }),
  });
  return response.json();
};