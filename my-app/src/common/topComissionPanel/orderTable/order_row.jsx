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
	}
));

export default CustomTableRow;
