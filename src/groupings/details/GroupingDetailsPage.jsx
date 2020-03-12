import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import groupingsApi from "../../_services/groupingsApi";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import GroupingRecordsTable from "./GroupingRecordsTable";

const GroupingDetailsPage$ = () => {
	const { id } = useParams();
	const [group, setGroup] = useState(null);
	useEffect(() => {
		const getGrouping = async (id) => {
			await groupingsApi.getById(id).then((g) => setGroup(g));
		};
		getGrouping(id).then((e) => console.log('Loaded Grouping', e));
	}, [id]);
	return (<Grid container
				  direction="row"
				  justify="center"
				  alignItems="center">
		<Grid item xs={10} sm={10}>
			{group && <Card>
				<h1>{group.name} [{group.key}]</h1>
			</Card>}
			{group && <GroupingRecordsTable recordType={group.key}/>}
		</Grid>
	</Grid>);
};

export default GroupingDetailsPage$;
