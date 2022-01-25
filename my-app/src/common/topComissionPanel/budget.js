import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import React from 'react';

export const Budget = (props) => (
	<Card sx={{ height: '100%' }} {...props} >
		<CardContent sx={{height: '100%'}}>
			<Grid container>
				<Grid item>
					<Typography color="textSecondary" gutterBottom variant="overline">
						{props.name}:
					</Typography>
					<Typography color="textPrimary" variant="h4" >
						{props.amount}
					</Typography>
				</Grid>
			</Grid>
			<Box sx={{ pt: 2, display: 'flex', alignItems: 'center' }} >
				{
					props.diff?
						(
							props.diff < 0?
								<ArrowDownwardIcon color="error" />
								: <ArrowUpwardIcon color="success"/>
						)
					: null
				}
				<Typography sx={{ mr: 1 }} variant="body2" >
					{props.diff}
				</Typography>
			</Box>
		</CardContent>
	</Card>
);
