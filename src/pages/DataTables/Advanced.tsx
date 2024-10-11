import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { getRequest, postRequest } from '../../utils/Request';
import { downloadExcel } from 'react-export-table-to-excel';

const Basic = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Advanced Table'));
    }, [dispatch]);

    const col = ['id', 'name', 'email', 'message', 'cTime'];
    const header = ['Id', 'Name', 'Email', 'Message', 'Date Time'];

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [12, 15, 20, 25, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    const [rowData, setData] = useState([]);
    const [initialRecords, setInitialRecords] = useState([]);
    const [recordsData, setRecordsData] = useState([]);
    const [sortedData, setSortedData] = useState([]);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });

    function handleDownloadExcel() {
        downloadExcel({
            fileName: 'table',
            sheet: 'react-export-table-to-excel',
            tablePayload: {
                header,
                body: rowData,
            },
        });
    }

    const fetchData = async () => {
        const headers = {
            "Content-Type": "application/json",
            "authorization": "Bearer " + localStorage.getItem('accessToken'),
        };
        const data = await getRequest('/v1/money/getTransection', {}, headers);
        setData(data);
        const sortedData = sortBy(data, 'id');
        setInitialRecords(sortedData);
        setSortedData(sortedData); // Initialize sorted data with default sort
    };

    useEffect(() => {
        fetchData();
    }, [pageSize]);

    // Update recordsData based on page, pageSize, and sortedData
    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData(sortedData.slice(from, to));
    }, [page, pageSize, sortedData]);

    // Sort the data when sortStatus changes
    useEffect(() => {
        const sorted = sortBy(initialRecords, sortStatus.columnAccessor);
        const sortedResult = sortStatus.direction === 'desc' ? sorted.reverse() : sorted;
        setSortedData(sortedResult);  // Save the sorted data
        setPage(1); // Reset to first page after sorting
    }, [sortStatus, initialRecords]);

    const columnsDefination = [
        { title: 'ID', sortable: true, render: (row, index) => <strong className="text-info">#{index + 1}</strong>, },
        {
            accessor: 'transectionTitle',
            title: 'Title',
            sortable: true,
            render: ({ transectionTitle }) => (
                <div className="flex items-center gap-2">
                    <div className="font-semibold">{transectionTitle}</div>
                </div>
            ),
        },
        {
            accessor: 'transectionAmount',
            title: 'Amount',
            sortable: true,
            render: ({ transectionAmount }) => (
                <div className="flex items-center gap-2">
                    <div className="font-semibold">{transectionAmount}</div>
                </div>
            ),
        },
        {
            accessor: 'paymentMethodName',
            title: 'Payment Method',
            sortable: true,
            render: ({ paymentMethodName }) => (
                <div className="flex items-center gap-2">
                    <div className="font-semibold">{paymentMethodName}</div>
                </div>
            ),
        },
        {
            accessor: 'transectionType',
            title: 'Transaction Type',
            sortable: true,
            render: ({ transectionType }) => (
                transectionType == '1' ? (
                    <span className="badge bg-success">Income</span>
                ) : (
                    transectionType == '0' ? (
                        <span className="badge bg-danger">Expense</span>
                    ) : (
                        <span className="badge bg-info">Transfer</span>
                    )
                )
            ),
        },
        {
            accessor: 'bankName',
            title: 'Bank Name',
            sortable: true,
            render: ({ bankName }) => (
                <div className="flex items-center gap-2">
                    <div className="font-semibold">{bankName}</div>
                </div>
            ),
        },
        {
            accessor: 'name',
            title: 'Name',
            sortable: true,
            render: ({ name }) => (
                <div className="flex items-center gap-2">
                    <div className="font-semibold">{name}</div>
                </div>
            ),
        },
        {
            accessor: 'transectionTime',
            title: 'Date',
            sortable: true,
            render: ({ transectionTime }) => (
                <div className="flex items-center gap-2">
                    <div className="font-semibold">{
                        new Date(transectionTime).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                        })
                    }</div>
                </div>
            ),
        }
    ];

    return (
        <div>
            <div className="panel">
                <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                    <div className="flex items-center flex-wrap">
                        <button type="button" onClick={() => exportTable('csv')} className="btn btn-primary btn-sm m-1">CSV</button>
                        <button type="button" onClick={() => exportTable('txt')} className="btn btn-primary btn-sm m-1">TXT</button>
                        <button type="button" className="btn btn-primary btn-sm m-1" onClick={handleDownloadExcel}>EXCEL</button>
                        <button type="button" onClick={() => exportTable('print')} className="btn btn-primary btn-sm m-1">PRINT</button>
                    </div>
                </div>
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Messages from website</h5>
                <div className="datatables">
                    <DataTable
                        noRecordsText="No results match your search query"
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={columnsDefination}
                        totalRecords={sortedData.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default Basic;
