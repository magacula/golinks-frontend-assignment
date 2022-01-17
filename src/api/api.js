export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      // 200 request
      return data;
    } else {
      throw Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
};
