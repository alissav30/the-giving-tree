import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { database } from '../../firebase.js'; // Adjust this path as necessary
import { ref, onValue } from "firebase/database";

const DonationTable = () => {
    const [page, setPage] = React.useState<number>(0);
    const [numberOfItemsPerPageList] = React.useState([6, 5, 2]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
    const [donations, setDonations] = React.useState([]);

    React.useEffect(() => {
        const donationsRef = ref(database, 'donations');
        onValue(donationsRef, (snapshot) => {
            const data = snapshot.val();
            const donationList = Object.keys(data).map((key) => ({
                key: key,
                date: data[key].date,
                nonprofit: data[key].orgName,
                amount: data[key].donateAmt,
            })).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort donations from most recent to least recent

            setDonations(donationList);
        });
    }, []);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, donations.length);

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

            {donations.slice(from, to).map((donation) => (
                <DataTable.Row key={donation.key}>
                    <DataTable.Cell>{donation.date}</DataTable.Cell>
                    <DataTable.Cell>{donation.nonprofit}</DataTable.Cell>
                    <DataTable.Cell numeric>${donation.amount}</DataTable.Cell>
                </DataTable.Row>
            ))}

            <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(donations.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${donations.length}`}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls
                selectPageDropdownLabel={'Rows per page'}
            />
        </DataTable>
    );
};

export default DonationTable;
