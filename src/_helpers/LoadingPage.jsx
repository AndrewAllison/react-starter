import React from "react";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingPage = () => {
	return (<Grid style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
				  container
				  direction="row"
				  justify="center"
				  alignItems="center">
		<Grid style={{textAlign: 'center'}} item xs={2}>
			<CircularProgress/>
		</Grid>
	</Grid>)
};
export default LoadingPage;
