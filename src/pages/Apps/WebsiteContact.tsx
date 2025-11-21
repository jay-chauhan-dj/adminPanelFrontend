import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { getRequest } from '../../utils/Request';
import { useNavigate } from 'react-router-dom';

const WebsiteContact = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setPageTitle('Website Contact'));
    });

    const [contacts, setContacts] = useState<any>([]);
    const [search, setSearch] = useState<any>('');
    const [filteredContacts, setFilteredContacts] = useState<any>([]);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

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
        setFilteredContacts(() => {
            return contacts.filter((item: any) => {
                return item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    (item.phone && item.phone.includes(search));
            });
        });
    }, [search, contacts]);

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
        const subjectMatch = message.match(/Subject:\s*(.+?)(?:\n|$)/i);
        const messageMatch = message.match(/Message:\s*(.+)/is);
        return {
            subject: subjectMatch ? subjectMatch[1].trim() : '-',
            message: messageMatch ? messageMatch[1].trim() : message
        };
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
                    <input type="text" placeholder="Search Contacts" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5"></circle>
                            <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="mt-5 panel p-0 border-0 overflow-hidden">
                <div className="table-responsive">
                    <table className="table-striped table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Subject</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredContacts.map((contact: any) => {
                                const parsed = parseMessage(contact.message);
                                const isExpanded = expandedRow === contact.id;
                                return (
                                    <>
                                        <tr key={contact.id} onClick={() => setExpandedRow(isExpanded ? null : contact.id)} className="cursor-pointer">
                                            <td>{contact.id}</td>
                                            <td>{contact.name}</td>
                                            <td>
                                                <span className="badge bg-primary cursor-pointer hover:opacity-80" onClick={(e) => copyToClipboard(contact.email, e)}>{contact.email}</span>
                                            </td>
                                            <td>
                                                <span className="badge bg-success cursor-pointer hover:opacity-80" onClick={(e) => handlePhoneClick(contact.phone || '', e)}>{contact.phone || '-'}</span>
                                            </td>
                                            <td>{parsed.subject}</td>
                                            <td className="whitespace-nowrap">{formatDate(contact.created_at)}</td>
                                        </tr>
                                        {isExpanded && (
                                            <tr key={`${contact.id}-expanded`}>
                                                <td colSpan={6} className="!p-0">
                                                    <div className="bg-white-light dark:bg-[#1b2e4b] p-6 border-t border-[#e0e6ed] dark:border-[#1b2e4b]">
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
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WebsiteContact;
