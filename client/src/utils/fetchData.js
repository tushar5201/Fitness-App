export const exerciseOptions = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'c92e06d5c6mshfce3e7cdfaad84ap1f19dfjsn2f60255af180',
		'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
	}
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};