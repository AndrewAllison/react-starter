import { useState } from "react";

const availablePageSize = [5, 15, 30, 50, 100];
const defaultRowsPerPage = 15;

const usePagination = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

	const handleChangePage = (change, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (change) => {
		setRowsPerPage(change.target.value);
		setPage(0);
	};
	return {
		page,
		rowsPerPage,
		handleChangePage,
		handleChangeRowsPerPage,
	}
};

export { availablePageSize, defaultRowsPerPage, usePagination };
