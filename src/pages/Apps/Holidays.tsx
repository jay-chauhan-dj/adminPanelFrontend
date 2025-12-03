import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { getRequest } from '../../utils/Request';
import { DataTable } from 'mantine-datatable';

interface Holiday {
    holidayId: number;
    holidayName: string;
    holidayDate: string;
    holidayIsWeekoff: number;
    holidayCreatedAt?: string;
}

const Holidays = () => {
    const dispatch = useDispatch();
    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(setPageTitle('Holidays'));
        fetchHolidays();
    }, [dispatch]);

    const fetchHolidays = async () => {
        try {
            setLoading(true);
            const response = await getRequest('/v1/holidays');
            
            if (response && response.success) {
                setHolidays(response.holidays || []);
            } else {
                setHolidays([]);
            }
        } catch (error) {
            console.error('Error fetching holidays:', error);
            setHolidays([]);
        } finally {
            setLoading(false);
        }
    };

    const getUpcomingHolidays = () => {
        const today = new Date();
        return holidays.filter(holiday => new Date(holiday.holidayDate) >= today).slice(0, 3);
    };

    const getCurrentMonthHolidays = () => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        return holidays.filter(holiday => {
            const holidayDate = new Date(holiday.holidayDate);
            return holidayDate.getMonth() === currentMonth && holidayDate.getFullYear() === currentYear;
        });
    };

    const columns = [
        {
            accessor: 'index',
            title: '🎉',
            textAlignment: 'center' as const,
            render: (holiday: Holiday, index: number) => {
                const holidayDate = new Date(holiday.holidayDate);
                const today = new Date();
                const isToday = holidayDate.toDateString() === today.toDateString();
                return (
                    <div className={`w-8 h-8 ${isToday ? 'bg-blue-500 text-white' : 'bg-primary/10 text-primary'} rounded-full flex items-center justify-center font-bold`}>
                        {index + 1}
                    </div>
                );
            }
        },
        {
            accessor: 'holidayName',
            title: 'Holiday Name',
            render: (holiday: Holiday) => {
                const holidayDate = new Date(holiday.holidayDate);
                const today = new Date();
                const isToday = holidayDate.toDateString() === today.toDateString();
                return (
                    <div className={`font-semibold ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-white'}`}>
                        {holiday.holidayName}
                        {isToday && <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">TODAY</span>}
                    </div>
                );
            }
        },
        {
            accessor: 'holidayDate',
            title: '📅 Date',
            render: (holiday: Holiday) => {
                const holidayDate = new Date(holiday.holidayDate);
                return (
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {holidayDate.toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </div>
                );
            }
        },
        {
            accessor: 'holidayIsWeekoff',
            title: '🏷️ Type',
            render: (holiday: Holiday) => (
                <span className={`badge ${holiday.holidayIsWeekoff ? 'badge-outline-warning' : 'badge-outline-success'} !py-2 !px-3`}>
                    {holiday.holidayIsWeekoff ? '📅 Weekly Off' : '🎉 Holiday'}
                </span>
            )
        },
        {
            accessor: 'status',
            title: '📊 Status',
            textAlignment: 'center' as const,
            render: (holiday: Holiday) => {
                const holidayDate = new Date(holiday.holidayDate);
                const today = new Date();
                const isPast = holidayDate < today;
                const isToday = holidayDate.toDateString() === today.toDateString();
                
                if (isToday) {
                    return <span className="badge badge-outline-info !py-2 !px-3">🎯 Today</span>;
                } else if (isPast) {
                    return <span className="badge badge-outline-secondary !py-2 !px-3">✅ Past</span>;
                } else {
                    return <span className="badge badge-outline-primary !py-2 !px-3">⏳ Upcoming</span>;
                }
            }
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="panel !p-0">
                <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 text-white rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold mb-2">🎊 Company Holidays</h1>
                            <p className="text-green-100">View all company holidays and weekly offs</p>
                        </div>
                        <div className="text-6xl opacity-80">🗓️</div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="panel bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium opacity-90">Total Holidays</h3>
                            <p className="text-2xl font-bold">{holidays.filter(h => !h.holidayIsWeekoff).length}</p>
                        </div>
                        <div className="text-3xl opacity-80">🎉</div>
                    </div>
                </div>
                <div className="panel bg-gradient-to-br from-purple-400 to-purple-600 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium opacity-90">Weekly Offs</h3>
                            <p className="text-2xl font-bold">{holidays.filter(h => h.holidayIsWeekoff).length}</p>
                        </div>
                        <div className="text-3xl opacity-80">📅</div>
                    </div>
                </div>
                <div className="panel bg-gradient-to-br from-green-400 to-green-600 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium opacity-90">This Month</h3>
                            <p className="text-2xl font-bold">{getCurrentMonthHolidays().length}</p>
                        </div>
                        <div className="text-3xl opacity-80">📆</div>
                    </div>
                </div>
                <div className="panel bg-gradient-to-br from-orange-400 to-orange-600 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium opacity-90">Upcoming</h3>
                            <p className="text-2xl font-bold">{getUpcomingHolidays().length}</p>
                        </div>
                        <div className="text-3xl opacity-80">⏰</div>
                    </div>
                </div>
            </div>

            {/* Upcoming Holidays */}
            {getUpcomingHolidays().length > 0 && (
                <div className="panel">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        🎯 Upcoming Holidays
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {getUpcomingHolidays().map((holiday) => (
                            <div key={holiday.holidayId} className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`badge ${holiday.holidayIsWeekoff ? 'badge-outline-warning' : 'badge-outline-success'} !text-xs`}>
                                        {holiday.holidayIsWeekoff ? 'Weekly Off' : 'Holiday'}
                                    </span>
                                    <span className="text-2xl">{holiday.holidayIsWeekoff ? '📅' : '🎉'}</span>
                                </div>
                                <h6 className="font-semibold text-gray-800 dark:text-white mb-1">{holiday.holidayName}</h6>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {new Date(holiday.holidayDate).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* All Holidays DataTable */}
            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light flex items-center">
                        <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        📋 All Holidays 
                    </h5>
                </div>

                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={holidays}
                        columns={columns}
                        sortStatus={{ columnAccessor: 'holidayDate', direction: 'asc' }}
                        minHeight={200}
                        fetching={loading}
                        noRecordsText="No holidays found"
                        rowClassName={(holiday: Holiday) => {
                            const holidayDate = new Date(holiday.holidayDate);
                            const today = new Date();
                            const isToday = holidayDate.toDateString() === today.toDateString();
                            return `hover:bg-gray-50 dark:hover:bg-gray-800 ${isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`;
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Holidays;