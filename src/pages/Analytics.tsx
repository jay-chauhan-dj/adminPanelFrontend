import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
import { getRequest } from '../utils/Request';
import { IRootState } from '../store';

const Analytics = () => {
    const dispatch = useDispatch();
    const [currentReport, setCurrentReport] = useState<any>(null);
    const [allReports, setAllReports] = useState<any[]>([]);
    const [dashboardStats, setDashboardStats] = useState<any>(null);
    const [todayAttendance, setTodayAttendance] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    
    const userRole = localStorage.getItem('userRole') || 'user';
    const isAdmin = userRole === 'admin';
    
    useEffect(() => {
        dispatch(setPageTitle('Analytics'));
        fetchData();
    }, [dispatch]);

    const fetchData = async () => {
        try {
            if (isAdmin) {
                const statsRes = await getRequest('v1/reports/dashboard-stats', {}, {}, true).catch(() => null);
                if (statsRes) {
                    setDashboardStats(statsRes);
                }
            } else {
                const [reportsRes, attendanceRes] = await Promise.all([
                    getRequest('v1/reports/monthly-reports', {}, {}, true),
                    getRequest('v1/attendance/today', {}, {}, true).catch(() => null)
                ]);
                
                if (reportsRes?.reports) {
                    const reports = reportsRes.reports;
                    setAllReports(reports);
                    
                    const now = new Date();
                    const current = reports.find((r: any) => r.year === now.getFullYear() && r.month === now.getMonth() + 1);
                    setCurrentReport(current || reports[0]);
                }
                
                if (attendanceRes) {
                    setTodayAttendance(attendanceRes);
                }
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMonthChange = (e: any) => {
        const value = e.target.value;
        setSelectedMonth(value);
        if (value) {
            const [year, month] = value.split('-');
            const report = allReports.find(r => r.year === parseInt(year) && r.month === parseInt(month));
            setCurrentReport(report);
        }
    };

    const monthOptions = allReports.map(r => ({
        value: `${r.year}-${r.month}`,
        label: new Date(r.year, r.month - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    }));

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg text-white-dark">Loading Analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Analytics</h1>
                    <p className="text-white-dark mt-2">Performance insights and attendance metrics</p>
                </div>
                {!isAdmin && monthOptions.length > 0 && (
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-white-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <select 
                            value={selectedMonth} 
                            onChange={handleMonthChange}
                            className="form-select font-semibold"
                        >
                            <option value="">Current Month</option>
                            {monthOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {isAdmin && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                        <div className="panel border-0 bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg">
                            <div className="flex items-center text-white">
                                <div className="flex-1">
                                    <div className="text-sm font-medium opacity-90 mb-1">Total Employees</div>
                                    <div className="text-4xl font-bold">{dashboardStats?.today?.total || 0}</div>
                                </div>
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                    <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="panel border-0 bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
                            <div className="flex items-center text-white">
                                <div className="flex-1">
                                    <div className="text-sm font-medium opacity-90 mb-1">Present Today</div>
                                    <div className="text-4xl font-bold">{(dashboardStats?.today?.ontime || 0) + (dashboardStats?.today?.late || 0)}</div>
                                </div>
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                    <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="panel border-0 bg-gradient-to-br from-rose-500 to-red-600 shadow-lg">
                            <div className="flex items-center text-white">
                                <div className="flex-1">
                                    <div className="text-sm font-medium opacity-90 mb-1">Absent Today</div>
                                    <div className="text-4xl font-bold">{dashboardStats?.today?.absent || 0}</div>
                                </div>
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                    <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="panel border-0 bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
                            <div className="flex items-center text-white">
                                <div className="flex-1">
                                    <div className="text-sm font-medium opacity-90 mb-1">On Leave</div>
                                    <div className="text-4xl font-bold">0</div>
                                </div>
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                    <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="panel">
                        <h3 className="text-lg font-bold mb-5">Today's Attendance Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <div className="text-center p-5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                                <div className="text-4xl font-bold text-emerald-600 mb-2">{dashboardStats?.today?.ontime || 0}</div>
                                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">On Time</div>
                            </div>
                            <div className="text-center p-5 bg-rose-50 dark:bg-rose-900/20 rounded-xl">
                                <div className="text-4xl font-bold text-rose-600 mb-2">{dashboardStats?.today?.late || 0}</div>
                                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">Late Arrivals</div>
                            </div>
                            <div className="text-center p-5 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                                <div className="text-4xl font-bold text-amber-600 mb-2">0</div>
                                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">On Break</div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {!isAdmin && currentReport && (
                <div className="panel p-0 overflow-hidden shadow-xl">
                    <div className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 p-10 text-white overflow-hidden">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptMCAxMmMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
                        <div className="relative flex items-center justify-between">
                            <div>
                                <div className="text-sm font-medium text-white/70 mb-2">Monthly Report</div>
                                <h2 className="text-5xl font-bold mb-3">
                                    {new Date(currentReport.year, currentReport.month - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </h2>
                                <div className="flex items-center gap-2 text-white/90">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="font-medium">{currentReport.user_name}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-7xl font-black">{currentReport.worked_days || 0}</div>
                                <div className="text-sm font-medium text-white/70 mt-1">Days Worked</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
                            <div className="group hover:scale-105 transition-transform duration-300">
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Worked Days</div>
                                            <div className="text-3xl font-bold text-gray-900 dark:text-white">{currentReport.worked_days || 0}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="group hover:scale-105 transition-transform duration-300">
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Total Hours</div>
                                            <div className="text-3xl font-bold text-gray-900 dark:text-white">{currentReport.total_working_hours || 0}<span className="text-xl">h</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="group hover:scale-105 transition-transform duration-300">
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Leaves</div>
                                            <div className="text-3xl font-bold text-gray-900 dark:text-white">{currentReport.leaves_taken || 0}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="group hover:scale-105 transition-transform duration-300">
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Absent</div>
                                            <div className="text-3xl font-bold text-gray-900 dark:text-white">{currentReport.absent_days || 0}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6 mb-6">
                            <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Attendance Details</h3>
                            <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700">
                                <div className="text-center px-4">
                                    <div className="text-3xl font-bold text-emerald-600 mb-1">{currentReport?.on_time_entries || 0}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">On Time</div>
                                </div>
                                <div className="text-center px-4">
                                    <div className="text-3xl font-bold text-rose-600 mb-1">{currentReport?.late_in || 0}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Late Arrivals</div>
                                </div>
                                <div className="text-center px-4">
                                    <div className="text-3xl font-bold text-amber-600 mb-1">{currentReport?.early_out || 0}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Early Departures</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6">
                            <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Today's Activity</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="panel border-0 bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg">
                                    <div className="flex flex-col items-center text-white p-4">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                            </svg>
                                        </div>
                                        <div className="text-xs font-medium opacity-90 mb-1">Clock In</div>
                                        <div className="text-2xl font-bold">{todayAttendance?.clockIn || '--:--'}</div>
                                    </div>
                                </div>

                                <div className="panel border-0 bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                                    <div className="flex flex-col items-center text-white p-4">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="text-xs font-medium opacity-90 mb-1">Break Time</div>
                                        <div className="text-2xl font-bold">{todayAttendance?.breakTime || '0'} mins</div>
                                    </div>
                                </div>

                                <div className="panel border-0 bg-gradient-to-br from-orange-500 to-red-600 shadow-lg">
                                    <div className="flex flex-col items-center text-white p-4">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                        </div>
                                        <div className="text-xs font-medium opacity-90 mb-1">Clock Out</div>
                                        <div className="text-2xl font-bold">{todayAttendance?.clockOut || '--:--'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!isAdmin && !currentReport && (
                <div className="panel">
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-5">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold dark:text-white mb-2">No Reports Available</h3>
                        <p className="text-white-dark">Your monthly reports will appear here once generated</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Analytics;
