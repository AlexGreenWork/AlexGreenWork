import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';

import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from './severity-pill';

const orders = [
  {
    id: uuid(),
    ref: '231',
    amount: 30.5,
    customer: {
      name: 'Екатерина Танькова'
    },
    createdAt: 1555016400000,
    status: 'в обработке'
  },
  {
    id: uuid(),
    ref: '250',
    amount: 25.1,
    customer: {
      name: 'Вася Пупкин'
    },
    createdAt: 1555016400000,
    status: 'обработано'
  },
  {
    id: uuid(),
    ref: '667',
    amount: 10.99,
    customer: {
      name: 'Александр Мордвинкин'
    },
    createdAt: 1554930000000,
    status: 'отклонено'
  },
  {
    id: uuid(),
    ref: '320',
    amount: 96.43,
    customer: {
      name: 'Анна Кац'
    },
    createdAt: 1554757200000,
    status: 'в обработке'
  },
  {
    id: uuid(),
    ref: '290',
    amount: 32.54,
    customer: {
      name: 'Кларк Кент'
    },
    createdAt: 1554670800000,
    status: 'обработано'
  },
  {
    id: uuid(),
    ref: '240',
    amount: 16.76,
    customer: {
      name: 'Адам Денисов'
    },
    createdAt: 1554670800000,
    status: 'обработано'
  }
];

export const LatestOrders = (props) => (
  <Card {...props}>
    <CardHeader title="Последние предложения" />
   
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Предложение
              </TableCell>
              <TableCell>
                Автор
              </TableCell>
              <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                   Дата
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                Статус
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                hover
                key={order.id}
              >
                <TableCell>
                  {order.ref}
                </TableCell>
                <TableCell>
                  {order.customer.name}
                </TableCell>
                <TableCell>
                  {format(order.createdAt, 'dd/MM/yyyy')}
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={(order.status === 'обработано' && 'success')
                    || (order.status === 'отклонено' && 'error')
                    || 'warning'}
                  >
                    {order.status}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        Посмотреть все
      </Button>
    </Box>
  </Card>
);
