import { styled, TableRow } from '@mui/material';

const CustomTableRow = styled(TableRow)(({ theme }) => (
	{
		'&:nth-of-type(odd)':
		{
			backgroundColor: "lightgrey",
		},

		'&:last-child td, &:last-child th':
		{
			border: 0,
		},

		'&:hover':
		{
			backgroundColor: "Darkgreen",
		},

		'&:hover > *':
		{
			color: "White",
		},

		'&:hover > * > *':
		{
			color: "White",
		},

		'&:hover > td > a':
		{
			color: "Darkorange",
			fontSize: "17px",
			fontWeight: "bold",
		},
	}
));

export default CustomTableRow;
