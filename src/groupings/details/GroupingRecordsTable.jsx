import React, { useEffect, useState } from 'react';
import { Card } from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import { availablePageSize, usePagination } from "../../_helpers/pagination";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useHistory } from 'react-router-dom';
import masterRecordsApi from "../../_services/masterRecordsApi";


const GroupingRecordsTable$ = (props) => {
	const {
		page, rowsPerPage, handleChangePage, handleChangeRowsPerPage
	} = usePagination();
	let history = useHistory();
	const [rows, setRows] = useState([]);
	const [length, setLength] = useState(0);
	const [isDataLoading, setIsDataLoading] = useState(false);

	useEffect(() => {
		setIsDataLoading(true);
		const getGroupings = () => {
			masterRecordsApi.getMasterRecords({
				rowsPerPage,
				page,
				recordType: props.recordType
			})
				.then((response) => {
					console.log(response);
					setRows(response.results);
					setLength(response.filteredLength);
					setIsDataLoading(false);
				});
		};
		getGroupings();
	}, [page, rowsPerPage, props.recordType]);
	return (<Card>
		<TablePagination
			rowsPerPageOptions={availablePageSize}
			component="div"
			count={length}
			rowsPerPage={rowsPerPage}
			page={page}
			onChangePage={handleChangePage}
			onChangeRowsPerPage={handleChangeRowsPerPage}
		/>
		<TableContainer component={Paper}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{isDataLoading &&
					<TableRow>
						<TableCell padding={'none'} colSpan={3}>
							<LinearProgress/>
						</TableCell>
					</TableRow>
					}
					{rows.map(row => (
						<TableRow className={'pointer'} key={`${row.name}-${row._id}`}
								  onClick={() => history.push(`/master-records/${row._id}`)}>
							<TableCell component="th" scope="row">
								{row.name}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	</Card>);
};

export default GroupingRecordsTable$;
