import React, { useState, useEffect, useMemo } from 'react';
import { Title, Badge, ActionIcon, Tooltip, Text, Box, LoadingOverlay, TextInput, Group } from '@mantine/core';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { IconDownload, IconSearch } from '@tabler/icons-react';
import sortBy from 'lodash/sortBy';
import { getRequest } from '../../../utils/Request'; // Adjusted path

interface InvoiceData {
    id: string;
    invoiceNumber: string;
    partyInvoiceNumber: string;
    invoiceTitle: string;
    invoiceDate: string;
    invoiceAmount: number;
    invoiceType: 'gst' | 'non-gst';
    invoiceNotes: string;
}

const mockInvoices: InvoiceData[] = [
    {
        id: '1',
        invoiceNumber: 'INV-2023-001',
        partyInvoiceNumber: 'PARTY-001',
        invoiceTitle: 'Web Development Services',
        invoiceDate: '2023-10-26',
        invoiceAmount: 1500.00,
        invoiceType: 'gst',
        invoiceNotes: 'Initial project phase payment. This is a rather long note to check text wrapping and display in the table.',
    },
    {
        id: '2',
        invoiceNumber: 'INV-2023-002',
        partyInvoiceNumber: 'PARTY-002',
        invoiceTitle: 'Consulting Services',
        invoiceDate: '2023-10-28',
        invoiceAmount: 800.00,
        invoiceType: 'non-gst',
        invoiceNotes: 'Hourly consulting for October.',
    },
    {
        id: '3',
        invoiceNumber: 'INV-2023-003',
        partyInvoiceNumber: 'PARTY-001',
        invoiceTitle: 'Server Maintenance',
        invoiceDate: '2023-11-01',
        invoiceAmount: 350.00,
        invoiceType: 'gst',
        invoiceNotes: 'Monthly server upkeep and backup services.',
    },
    // Add more mock data for pagination testing
    {
        id: '4',
        invoiceNumber: 'INV-2023-004',
        partyInvoiceNumber: 'PARTY-003',
        invoiceTitle: 'Graphic Design Work',
        invoiceDate: '2023-11-05',
        invoiceAmount: 1200.00,
        invoiceType: 'gst',
        invoiceNotes: 'Logo and branding materials.',
    },
    {
        id: '5',
        invoiceNumber: 'INV-2023-005',
        partyInvoiceNumber: 'PARTY-004',
        invoiceTitle: 'Software License Renewal',
        invoiceDate: '2023-11-10',
        invoiceAmount: 99.00,
        invoiceType: 'non-gst',
        invoiceNotes: 'Annual license for productivity software.',
    },
    {
        id: '6',
        invoiceNumber: 'INV-2023-006',
        partyInvoiceNumber: 'PARTY-002',
        invoiceTitle: 'SEO Optimization',
        invoiceDate: '2023-11-15',
        invoiceAmount: 600.00,
        invoiceType: 'gst',
        invoiceNotes: 'On-page and off-page SEO services.',
    },
];

const PAGE_SIZES = [10, 20, 30, 50];

const InvoicesPage = () => {
    const [allInvoices, setAllInvoices] = useState<InvoiceData[]>([]);
    const [records, setRecords] = useState<InvoiceData[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'invoiceDate', direction: 'desc' });
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    // Debounce query
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(query), 500);
        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        const fetchInvoices = async () => {
            setLoading(true);
            try {
                // const data = await getRequest('/api/invoices'); // Replace with actual endpoint
                // Simulating API call failure and using mock data
                console.log("Attempting to fetch invoices from /api/invoices (will use mock data)");
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
                // if (!data || data.length === 0) { // Check if data is undefined or empty
                    console.warn('/api/invoices endpoint not available or returned no data. Using mock data.');
                    setAllInvoices(mockInvoices);
                // } else {
                //     setAllInvoices(data);
                // }
            } catch (error) {
                console.error("Failed to fetch invoices, using mock data:", error);
                setAllInvoices(mockInvoices); // Fallback to mock data
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    const filteredAndSortedInvoices = useMemo(() => {
        let filteredData = allInvoices;
        if (debouncedQuery) {
            filteredData = allInvoices.filter(({ invoiceTitle, invoiceNumber, partyInvoiceNumber, invoiceNotes }) => {
                const q = debouncedQuery.toLowerCase();
                return (
                    invoiceTitle.toLowerCase().includes(q) ||
                    invoiceNumber.toLowerCase().includes(q) ||
                    partyInvoiceNumber.toLowerCase().includes(q) ||
                    invoiceNotes.toLowerCase().includes(q)
                );
            });
        }

        const columnAccessor = sortStatus.columnAccessor as keyof InvoiceData;
        let sortedData = sortBy(filteredData, columnAccessor);
        if (sortStatus.direction === 'desc') {
            sortedData = sortedData.reverse();
        }
        return sortedData;
    }, [allInvoices, debouncedQuery, sortStatus]);

    useEffect(() => {
        if (loading) return;

        const from = (page - 1) * pageSize;
        const to = from + pageSize;

        setRecords(filteredAndSortedInvoices.slice(from, to));
        setTotalRecords(filteredAndSortedInvoices.length);
    }, [page, pageSize, filteredAndSortedInvoices, loading]);

    // Reset page to 1 when query changes
    useEffect(() => {
        setPage(1);
    }, [debouncedQuery]);

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    return (
        <Box sx={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <LoadingOverlay visible={loading} overlayBlur={2} />
            <Group position="apart" mb="lg">
                <Title order={2}>Invoices</Title>
                <TextInput
                    placeholder="Search invoices..."
                    icon={<IconSearch size={16} />}
                    value={query}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    sx={{ width: 300 }}
                />
            </Group>
            <DataTable
                withBorder
                borderRadius="sm"
                striped
                highlightOnHover
                records={records}
                totalRecords={totalRecords}
                recordsPerPage={pageSize}
                page={page}
                onPageChange={(p) => setPage(p)}
                recordsPerPageOptions={PAGE_SIZES}
                onRecordsPerPageChange={setPageSize}
                sortStatus={sortStatus}
                onSortStatusChange={setSortStatus}
                minHeight={200} // To prevent layout jumps with few records
                columns={[
                    {
                        accessor: 'invoiceNumber',
                        title: 'Invoice #',
                        sortable: true,
                        textAlignment: 'left',
                    },
                    {
                        accessor: 'partyInvoiceNumber',
                        title: 'Party Invoice #',
                        sortable: true,
                        textAlignment: 'left',
                    },
                    {
                        accessor: 'invoiceTitle',
                        title: 'Title',
                        sortable: true,
                    },
                    {
                        accessor: 'invoiceDate',
                        title: 'Date',
                        sortable: true,
                        textAlignment: 'left',
                        render: ({ invoiceDate }) => formatDate(invoiceDate),
                    },
                    {
                        accessor: 'invoiceAmount',
                        title: 'Amount',
                        sortable: true,
                        textAlignment: 'right',
                        render: ({ invoiceAmount }) => formatCurrency(invoiceAmount),
                    },
                    {
                        accessor: 'invoiceType',
                        title: 'Type',
                        sortable: true,
                        render: ({ invoiceType }) => (
                            <Badge color={invoiceType === 'gst' ? 'teal' : 'blue'} variant="light">
                                {invoiceType.toUpperCase()}
                            </Badge>
                        ),
                    },
                    {
                        accessor: 'invoiceNotes',
                        title: 'Notes',
                        // Optional: Control width if notes are too long
                        // width: 200,
                        render: ({ invoiceNotes }) => (
                            <Tooltip label={invoiceNotes} multiline  position="top-start" withArrow>
                                <Text size="sm" lineClamp={2}>{invoiceNotes}</Text>
                            </Tooltip>
                        )
                    },
                    {
                        accessor: 'actions',
                        title: 'Actions',
                        textAlignment: 'center',
                        render: (invoice) => (
                            <Tooltip label={`Download Invoice '${invoice.invoiceNumber}'`}>
                                <ActionIcon
                                    color="blue"
                                    variant="transparent"
                                    onClick={() => alert(`Initiate download for ${invoice.invoiceNumber}`)} // Replace with actual download logic
                                >
                                    <IconDownload size={16} />
                                </ActionIcon>
                            </Tooltip>
                        ),
                    },
                ]}
            />
        </Box>
    );
};

export default InvoicesPage;
