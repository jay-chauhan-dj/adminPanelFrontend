import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { getRequest } from '../../utils/Request';
import { useNavigate } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';

const WebsiteContact = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setPageTitle('Website Contact'));
    });

    const [contacts, setContacts] = useState<any>([]);
    const [search, setSearch] = useState<any>('');
    const [filteredContacts, setFilteredContacts] = useState<any>([]);
    const [expandedRecordIds, setExpandedRecordIds] = useState<number[]>([]);
    
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 15, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(15);
    const [recordsData, setRecordsData] = useState<any>([]);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const headers = {
                "Content-Type": "application/json",
                "authorization": "Bearer " + localStorage.getItem('accessToken')
            };
            const data = await getRequest('/v1/websiteContact/getContacts', {}, headers);
            setContacts(data);
            setFilteredContacts(data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    useEffect(() => {
        const filtered = contacts.filter((item: any) => {
            const searchLower = search.toLowerCase();
            const parsed = parseMessage(item.message);
            return item.name.toLowerCase().includes(searchLower) ||
                item.email.toLowerCase().includes(searchLower) ||
                (item.phone && item.phone.includes(search)) ||
                item.id.toString().includes(search) ||
                parsed.subject.toLowerCase().includes(searchLower) ||
                parsed.message.toLowerCase().includes(searchLower) ||
                formatDate(item.created_at).toLowerCase().includes(searchLower);
        });
        setFilteredContacts(filtered);
    }, [search, contacts]);

    useEffect(() => {
        let sorted;
        if (sortStatus.columnAccessor === 'subject') {
            sorted = sortBy(filteredContacts, (item) => parseMessage(item.message).subject.toLowerCase());
        } else {
            sorted = sortBy(filteredContacts, (item) => {
                const value = item[sortStatus.columnAccessor];
                return typeof value === 'string' ? value.toLowerCase() : value;
            });
        }
        const sortedResult = sortStatus.direction === 'desc' ? sorted.reverse() : sorted;
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData(sortedResult.slice(from, to));
    }, [page, pageSize, sortStatus, filteredContacts]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const parseMessage = (message: string) => {
        if (!message) return { subject: '-', message: '-' };
        
        const subjectMatch = message.match(/Subject:\s*(.+?)(?:\n|$)/i);
        const messageMatch = message.match(/Message:\s*(.+)/is);
        
        let subject = '-';
        let messageText = message;
        
        if (subjectMatch) {
            subject = subjectMatch[1].trim();
            if (messageMatch) {
                messageText = messageMatch[1].trim();
            } else {
                const afterSubject = message.substring(message.indexOf(subjectMatch[0]) + subjectMatch[0].length).trim();
                messageText = afterSubject || message;
            }
        } else if (messageMatch) {
            messageText = messageMatch[1].trim();
        }
        
        return { subject, message: messageText };
    };

    const copyToClipboard = (text: string, e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(text);
    };

    const handlePhoneClick = (phone: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (e.detail === 1) {
            navigator.clipboard.writeText(phone);
        } else if (e.detail === 2) {
            navigate('/apps/chat', { state: { phoneNumber: '+91' + phone } });
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">Website Contact</h2>
                <div className="relative">
                    <input type="text" placeholder="Search" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5"></circle>
                            <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="mt-5 panel p-0 border-0 overflow-hidden">
                <div className="datatables">
                    <DataTable
                        noRecordsText="No contacts found"
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            {
                                accessor: 'id',
                                title: 'ID',
                                sortable: true,
                                render: ({ id }) => <strong className="text-info">#{id}</strong>
                            },
                            {
                                accessor: 'name',
                                title: 'Name',
                                sortable: true,
                                render: ({ name }) => <div className="font-semibold">{name}</div>
                            },
                            {
                                accessor: 'email',
                                title: 'Email',
                                sortable: true,
                                render: ({ email }) => (
                                    <span className="badge bg-primary cursor-pointer hover:opacity-80" onClick={(e) => copyToClipboard(email, e)}>{email}</span>
                                )
                            },
                            {
                                accessor: 'phone',
                                title: 'Phone',
                                sortable: true,
                                render: ({ phone }) => (
                                    <span className="badge bg-success cursor-pointer hover:opacity-80" onClick={(e) => handlePhoneClick(phone || '', e)}>{phone || '-'}</span>
                                )
                            },
                            {
                                accessor: 'subject',
                                title: 'Subject',
                                sortable: true,
                                render: ({ message }) => <div>{parseMessage(message).subject}</div>
                            },
                            {
                                accessor: 'created_at',
                                title: 'Date',
                                sortable: true,
                                render: ({ created_at }) => <div className="whitespace-nowrap">{formatDate(created_at)}</div>
                            }
                        ]}
                        totalRecords={filteredContacts.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => <span className="ltr:pl-4 rtl:pr-4">{`Showing ${from} to ${to} of ${totalRecords} entries`}</span>}
                        rowExpansion={{
                            allowMultiple: false,
                            content: ({ record }) => {
                                const parsed = parseMessage(record.message);
                                return (
                                    <div className="bg-white-light dark:bg-[#1b2e4b] p-6">
                                        <div className="flex gap-4">
                                            <div className="flex-none">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z" stroke="currentColor" strokeWidth="1.5"/>
                                                        <path opacity="0.5" d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-semibold text-primary mb-2">Message</div>
                                                <div className="text-base whitespace-pre-wrap leading-relaxed">{parsed.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default WebsiteContact;
