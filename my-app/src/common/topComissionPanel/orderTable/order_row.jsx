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
		'&:hover td':
		{
			color: "white",
		},
		'&:hover td > a':
		{
			color: "Orange",
			fontSize: "18px",
			fontWeight: "bold",
			cursor: "pointer",
		},
	}
));

export default CustomTableRow;
