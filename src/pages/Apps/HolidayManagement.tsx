import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { getRequest, postRequest, putRequest, deleteRequest } from '../../utils/Request';
import Swal from 'sweetalert2';
import { DataTable } from 'mantine-datatable';

interface Holiday {
    holidayId: number;
    holidayName: string;
    holidayDate: string;
    holidayIsWeekoff: number;
    holidayCreatedAt: string;
}

const HolidayManagement = () => {
    const dispatch = useDispatch();
    const currentYear = new Date().getFullYear();
    
    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showBulkModal, setShowBulkModal] = useState(false);
    const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null);
    const [formData, setFormData] = useState({
        holidayName: '',
        holidayDate: '',
        holidayIsWeekoff: 0
    });
    const [bulkData, setBulkData] = useState({
        leaveName: '',
        selectedDays: [] as number[],
        selectedWeeks: [] as number[],
        selectedMonths: [] as number[],
        selectedYear: currentYear
    });

    useEffect(() => {
        dispatch(setPageTitle('Holiday Management'));
        loadHolidays();
    }, []);

    const loadHolidays = async () => {
        setLoading(true);
        try {
            const response = await getRequest('/v1/holidays');
            if (response.success) {
                setHolidays(response.holidays);
            }
        } catch (error) {
            console.error('Failed to load holidays');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingHoliday) {
                const response = await putRequest(`/v1/holidays/${editingHoliday.holidayId}`, formData);
                if (response.success) {
                    Swal.fire('Success', 'Holiday updated successfully', 'success');
                }
            } else {
                const response = await postRequest('/v1/holidays', formData);
                if (response.success) {
                    Swal.fire('Success', 'Holiday created successfully', 'success');
                }
            }
            
            setShowModal(false);
            resetForm();
            loadHolidays();
        } catch (error: any) {
            Swal.fire('Error', error.response?.data?.message || 'Operation failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (holiday: Holiday) => {
        setEditingHoliday(holiday);
        setFormData({
            holidayName: holiday.holidayName,
            holidayDate: holiday.holidayDate,
            holidayIsWeekoff: holiday.holidayIsWeekoff
        });
        setShowModal(true);
    };

    const handleDelete = async (holidayId: number) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This holiday will be permanently deleted',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const response = await deleteRequest(`/v1/holidays/${holidayId}`);
                if (response.success) {
                    Swal.fire('Deleted!', 'Holiday has been deleted', 'success');
                    loadHolidays();
                }
            } catch (error: any) {
                Swal.fire('Error', error.response?.data?.message || 'Delete failed', 'error');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            holidayName: '',
            holidayDate: '',
            holidayIsWeekoff: 0
        });
        setEditingHoliday(null);
    };

    const closeModal = () => {
        setShowModal(false);
        resetForm();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getWeekoffBadge = (isWeekoff: number) => {
        return isWeekoff ? 'badge-outline-warning' : 'badge-outline-success';
    };

    const handleBulkWeeklyOff = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bulkData.leaveName.trim()) {
            Swal.fire('Error', 'Please enter a leave name', 'error');
            return;
        }
        if (bulkData.selectedDays.length === 0 && bulkData.selectedWeeks.length === 0 && 
            bulkData.selectedMonths.length === 0) {
            Swal.fire('Error', 'Please select at least one day, week, or month', 'error');
            return;
        }

        setLoading(true);
        try {
            const holidaysToCreate: { holidayName: string; holidayDate: string; holidayIsWeekoff: number; }[] = [];
            const year = bulkData.selectedYear;

            for (const monthIndex of bulkData.selectedMonths) {
                for (const weekNumber of bulkData.selectedWeeks) {
                    for (const dayIndex of bulkData.selectedDays) {
                        const dates = getWeekDatesInMonth(year, monthIndex - 1, weekNumber - 1, dayIndex);
                        dates.forEach(date => {
                            holidaysToCreate.push({
                                holidayName: bulkData.leaveName,
                                holidayDate: date.toISOString().split('T')[0],
                                holidayIsWeekoff: 1
                            });
                        });
                    }
                }
            }

            let successCount = 0;
            for (const holiday of holidaysToCreate) {
                try {
                    const response = await postRequest('/v1/holidays', holiday);
                    if (response.success) successCount++;
                } catch (error) {
                    console.error('Failed to create holiday:', error);
                }
            }

            if (successCount > 0) {
                Swal.fire('Success', `${successCount} weekly offs created successfully`, 'success');
                setShowBulkModal(false);
                setBulkData({ leaveName: '', selectedDays: [], selectedWeeks: [], selectedMonths: [], selectedYear: currentYear });
                loadHolidays();
            } else {
                Swal.fire('Error', 'Failed to create weekly offs', 'error');
            }
        } catch (error: any) {
            Swal.fire('Error', error.message || 'Operation failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    const getWeekDatesInMonth = (year: number, month: number, weekNumber: number, dayOfWeek: number) => {
        const dates: Date[] = [];
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        for (let date = 1; date <= lastDay.getDate(); date++) {
            const currentDate = new Date(year, month, date);
            if (currentDate.getDay() === dayOfWeek) {
                const weekOfMonth = Math.floor((date - 1) / 7);
                if (weekOfMonth === weekNumber) {
                    dates.push(currentDate);
                }
            }
        }
        
        return dates;
    };

    const handleSelectionToggle = (type: 'days' | 'weeks' | 'months', value: number) => {
        setBulkData(prev => {
            const key = type === 'days' ? 'selectedDays' : 
                       type === 'weeks' ? 'selectedWeeks' : 'selectedMonths';
            const current = prev[key];
            return {
                ...prev,
                [key]: current.includes(value) 
                    ? current.filter(v => v !== value)
                    : [...current, value]
            };
        });
    };

    const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const years = Array.from({length: 5}, (_, i) => currentYear + i);

    const columns = [
        {
            accessor: 'holidayName',
            title: 'Holiday Name',
            sortable: true,
        },
        {
            accessor: 'holidayDate',
            title: 'Date',
            sortable: true,
            render: ({ holidayDate }: Holiday) => formatDate(holidayDate),
        },
        {
            accessor: 'holidayIsWeekoff',
            title: 'Type',
            render: ({ holidayIsWeekoff }: Holiday) => (
                <span className={`badge ${getWeekoffBadge(holidayIsWeekoff)}`}>
                    {holidayIsWeekoff ? 'Week Off' : 'Holiday'}
                </span>
            ),
        },
        {
            accessor: 'actions',
            title: 'Actions',
            render: (holiday: Holiday) => (
                <div className="flex gap-2">
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(holiday)}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(holiday.holidayId)}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h5 className="font-semibold text-lg dark:text-white-light">Holiday Management</h5>
                <div className="flex gap-3">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setShowModal(true)}
                    >
                        Add Holiday
                    </button>
                    <button
                        type="button"
                        className="btn bg-purple-500 text-white hover:bg-purple-600"
                        onClick={() => setShowBulkModal(true)}
                    >
                        Bulk Weekly Off
                    </button>
                </div>
            </div>

            <div className="panel">
                {loading ? (
                    <div className="text-center py-10">Loading...</div>
                ) : (
                    <div className="table-responsive">
                        <table className="table-hover">
                            <thead>
                                <tr>
                                    <th>Holiday Name</th>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {holidays.map((holiday) => (
                                    <tr key={holiday.holidayId}>
                                        <td>{holiday.holidayName}</td>
                                        <td>{formatDate(holiday.holidayDate)}</td>
                                        <td>
                                            <span className={`badge ${getWeekoffBadge(holiday.holidayIsWeekoff)}`}>
                                                {holiday.holidayIsWeekoff ? 'Week Off' : 'Holiday'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => handleEdit(holiday)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(holiday.holidayId)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {holidays.length === 0 && (
                            <div className="text-center py-10">No holidays found</div>
                        )}
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">
                                {editingHoliday ? 'Edit Holiday' : 'Add Holiday'}
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-600"
                                onClick={closeModal}
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="holidayName" className="block text-sm font-medium mb-1">
                                    Holiday Name *
                                </label>
                                <input
                                    id="holidayName"
                                    type="text"
                                    className="form-input w-full"
                                    value={formData.holidayName}
                                    onChange={(e) => setFormData({ ...formData, holidayName: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="holidayDate" className="block text-sm font-medium mb-1">
                                    Date *
                                </label>
                                <input
                                    id="holidayDate"
                                    type="date"
                                    className="form-input w-full"
                                    value={formData.holidayDate}
                                    onChange={(e) => setFormData({ ...formData, holidayDate: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        checked={formData.holidayIsWeekoff === 1}
                                        onChange={(e) => setFormData({ ...formData, holidayIsWeekoff: e.target.checked ? 1 : 0 })}
                                    />
                                    <span className="text-white-dark ml-2">Mark as Week Off</span>
                                </label>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary flex-1"
                                    disabled={loading}
                                >
                                    {loading ? 'Saving...' : editingHoliday ? 'Update' : 'Create'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary flex-1"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Bulk Weekly Off Modal */}
            {showBulkModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Bulk Weekly Off</h3>
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-600"
                                onClick={() => setShowBulkModal(false)}
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleBulkWeeklyOff} className="space-y-6">
                            {/* Leave Name */}
                            <div>
                                <label htmlFor="leaveName" className="block text-sm font-medium mb-1">
                                    Leave Name *
                                </label>
                                <input
                                    id="leaveName"
                                    type="text"
                                    className="form-input w-full"
                                    value={bulkData.leaveName}
                                    onChange={(e) => setBulkData({ ...bulkData, leaveName: e.target.value })}
                                    placeholder="Enter leave name (e.g., Weekly Off)"
                                    required
                                />
                            </div>

                            {/* Days Selection */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Select Days</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {weekdayNames.map((day, index) => (
                                        <label key={index} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox"
                                                checked={bulkData.selectedDays.includes(index)}
                                                onChange={() => handleSelectionToggle('days', index)}
                                            />
                                            <span className="text-white-dark ml-2 text-sm">{day}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Weeks Selection */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Select Weeks</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {['1st Week', '2nd Week', '3rd Week', '4th Week'].map((week, index) => (
                                        <label key={index} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox"
                                                checked={bulkData.selectedWeeks.includes(index + 1)}
                                                onChange={() => handleSelectionToggle('weeks', index + 1)}
                                            />
                                            <span className="text-white-dark ml-2 text-sm">{week}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Months Selection */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Select Months</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {monthNames.map((month, index) => (
                                        <label key={index} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox"
                                                checked={bulkData.selectedMonths.includes(index + 1)}
                                                onChange={() => handleSelectionToggle('months', index + 1)}
                                            />
                                            <span className="text-white-dark ml-2 text-sm">{month}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Year Selection */}
                            <div>
                                <label htmlFor="selectedYear" className="block text-sm font-medium mb-2">Select Year</label>
                                <select
                                    id="selectedYear"
                                    className="form-select w-full"
                                    value={bulkData.selectedYear}
                                    onChange={(e) => setBulkData({ ...bulkData, selectedYear: parseInt(e.target.value) })}
                                >
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary flex-1"
                                    disabled={loading}
                                >
                                    {loading ? 'Creating...' : 'Create Weekly Offs'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary flex-1"
                                    onClick={() => setShowBulkModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HolidayManagement;