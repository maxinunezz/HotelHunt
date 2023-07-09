const calculatePageNumbers = (valuesLength: number): number[] => {
	const tempPageNumberArray: number[] = [];

	for (let i = 1; i <= Math.ceil(valuesLength / 3); i++) {
		tempPageNumberArray.push(i);
	}

	return tempPageNumberArray;
};
export default calculatePageNumbers;
