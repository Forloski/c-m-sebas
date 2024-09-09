export const getViaCep = async () => {
	const response = await fetch(`https://api.agify.io/?name=bella`);
	const data = await response.json();

	return data;
};
