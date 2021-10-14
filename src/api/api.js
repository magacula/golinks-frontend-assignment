import React from "react";

export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      // 200 request
      return data;
    } else {
      // request failed (404 status)
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};
