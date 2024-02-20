import * as React from 'react';
import { DataTable } from 'react-native-paper';

const DonationTable = () => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([6, 5, 2]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const [items] = React.useState([
   {
     key: 1,
     name: '1/4/2023',
     nonprofit: 'Red Cross',
     amount: 25,
   },
   {
     key: 2,
     name: '1/12/2023',
     nonprofit: 'Feeding America',
     amount: 100,
   },
   {
     key: 3,
     name: '1/15/2023',
     nonprofit: 'No Kid Hungry',
     amount: 150,
   },
   {
     key: 4,
     name: '2/4/2023',
     nonprofit: 'Salvation Army',
     amount: 25,
   },
   {
    key: 5,
    name: '2/7/2023',
    nonprofit: 'St. Jude Childrens Research Hospital',
    amount: 25,
  },
  {
    key: 6,
    name: '3/4/2023',
    nonprofit: 'Red Cross',
    amount: 25,
  },
  {
    key: 7,
    name: '4/4/2023',
    nonprofit: 'YMCA of the USA',
    amount: 25,
  },
  {
    key: 8,
    name: '5/14/2023',
    nonprofit: 'Boys & Girls Clubs of America',
    amount: 25,
  },
  {
    key: 9,
    name: '5/24/2023',
    nonprofit: 'HealthWell Foundation',
    amount: 25,
  },
  {
    key: 10,
    name: '6/1/2023',
    nonprofit: 'American Cancer Society',
    amount: 25,
  },
  {
    key: 11,
    name: '6/4/2023',
    nonprofit: 'Red Cross',
    amount: 25,
  },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Date</DataTable.Title>
        <DataTable.Title>Nonprofit</DataTable.Title>
        <DataTable.Title numeric>Amount</DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.key}>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell>{item.nonprofit}</DataTable.Cell>
          <DataTable.Cell numeric>${item.amount}</DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        // numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
};

export default DonationTable;