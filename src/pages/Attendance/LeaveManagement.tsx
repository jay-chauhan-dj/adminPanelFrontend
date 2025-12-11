import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { getRequest, postRequest, putRequest, deleteRequest } from '../../utils/Request';
import Swal from 'sweetalert2';

const LeaveManagement = () => {
    const dispatch = useDispatch();
    const [leaveTypes, setLeaveTypes] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const userRole = localStorage.getItem('userRole') || '';
    const [formData, setFormData] = useState({
        leaveTypeId: null,
        leaveTypeName: '',
        leaveTypeIsPaid: false,
        leaveTypeIsEncashable: false,
        leaveTypeRequireApproval: false,
        leaveTypeRequireAttachment: false
    });
    const [leaveFormData, setLeaveFormData] = useState({
        user_id: '',
        leave_type_id: '',
        from_date: '',
        to_date: '',
        day_type: 'full',
        reason: ''
    });
    const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [leaveBalances, setLeaveBalances] = useState<any[]>([]);
    const [availableLeaveTypes, setAvailableLeaveTypes] = useState<any[]>([]);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectRequestId, setRejectRequestId] = useState<number | null>(null);
    const [rejectionReason, setRejectionReason] = useState('');

    useEffect(() => {
        dispatch(setPageTitle('Leave Management'));
        fetchLeaveTypes();
        fetchLeaveRequests();
        
        // Fetch current user info for regular users only
        if (userRole !== 'Admin' && userRole !== 'HR') {
            fetchCurrentUser();
            fetchLeaveBalances();
            fetchAvailableLeaveTypes();
        }
    }, []);

    const fetchLeaveTypes = async () => {
        setLoading(true);
        try {
            const response = await getRequest('/v1/leave/types');
            if (response?.success && response?.leaveTypes) {
                setLeaveTypes(response.leaveTypes);
            }
        } catch (error) {
            console.error('Error fetching leave types:', error);
            Swal.fire('Error', 'Failed to load leave types', 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchLeaveRequests = async () => {
        try {
            const endpoint = (userRole === 'Admin' || userRole === 'HR')
                ? '/v1/leave/requests' 
                : '/v1/leave/requests/my';
            
            const response = await getRequest(endpoint);
            
            if (response?.success && response?.leave_requests) {
                setLeaveRequests(response.leave_requests);
            } else {
                setLeaveRequests([]);
            }
        } catch (error) {
            console.error('Error fetching leave requests:', error);
            setLeaveRequests([]);
        }
    };

    const handleSave = async () => {
        if (!formData.leaveTypeName.trim()) {
            Swal.fire('Error', 'Leave type name is required', 'error');
            return;
        }

        setIsSaving(true);
        try {
            const payload: any = {
                leaveTypeName: formData.leaveTypeName,
                leaveTypeIsActive: 1,
                leaveTypeIsPaid: formData.leaveTypeIsPaid ? 1 : 0,
                leaveTypeIsEncashable: formData.leaveTypeIsEncashable ? 1 : 0,
                leaveTypeRequireApproval: formData.leaveTypeRequireApproval ? 1 : 0,
                leaveTypeRequireAttachment: formData.leaveTypeRequireAttachment ? 1 : 0
            };

            // Add timestamp only when creating (not editing)
            if (!editMode) {
                const now = new Date();
                payload.leaveTypeCreatedAt = now.toISOString().slice(0, 19).replace('T', ' ');
            }

            const response = editMode
                ? await putRequest(`/v1/leave/types/${formData.leaveTypeId}`, payload)
                : await postRequest('/v1/leave/types', payload);

            console.log('Payload sent:', payload); // Debug log

            if (response?.success) {
                Swal.fire('Success', `Leave type ${editMode ? 'updated' : 'created'} successfully`, 'success');
                setShowModal(false);
                setEditMode(false);
                setFormData({
                    leaveTypeId: null,
                    leaveTypeName: '',
                    leaveTypeIsPaid: false,
                    leaveTypeIsEncashable: false,
                    leaveTypeRequireApproval: false,
                    leaveTypeRequireAttachment: false
                });
                fetchLeaveTypes();
            } else {
                Swal.fire('Error', response?.message || 'Failed to save leave type', 'error');
            }
        } catch (error: any) {
            console.error('Save error:', error);
            const errorMsg = error?.response?.data?.error || error?.response?.data?.message || error?.message || 'An error occurred while saving';
            Swal.fire('Error', errorMsg, 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleEdit = (type: any) => {
        setFormData({
            leaveTypeId: type.leaveTypeId,
            leaveTypeName: type.leaveTypeName,
            leaveTypeIsPaid: !!type.leaveTypeIsPaid,
            leaveTypeIsEncashable: !!type.leaveTypeIsEncashable,
            leaveTypeRequireApproval: !!type.leaveTypeRequireApproval,
            leaveTypeRequireAttachment: !!type.leaveTypeRequireAttachment
        });
        setEditMode(true);
        setShowModal(true);
    };

    const handleDelete = async (type: any) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Delete "${type.leaveTypeName}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                const response = await deleteRequest(`/v1/leave/types/${type.leaveTypeId}`);
                if (response?.success) {
                    Swal.fire('Deleted!', 'Leave type deleted successfully', 'success');
                    fetchLeaveTypes();
                } else {
                    Swal.fire('Error', response?.message || 'Failed to delete leave type', 'error');
                }
            } catch (error: any) {
                Swal.fire('Error', error?.message || 'An error occurred', 'error');
            }
        }
    };

    const openAddModal = () => {
        setFormData({
            leaveTypeId: null,
            leaveTypeName: '',
            leaveTypeIsPaid: false,
            leaveTypeIsEncashable: false,
            leaveTypeRequireApproval: false,
            leaveTypeRequireAttachment: false
        });
        setEditMode(false);
        setShowModal(true);
    };

    const fetchCurrentUser = async () => {
        try {
            const response = await getRequest('/v1/leave/current-user');
            if (response?.success && response?.user) {
                setCurrentUser(response.user);
            }
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    const fetchLeaveBalances = async () => {
        try {
            const response = await getRequest('/v1/leave/balance');
            if (response?.success && response?.balances) {
                setLeaveBalances(response.balances);
            } else if (response?.success && response?.leave_balances) {
                setLeaveBalances(response.leave_balances);
            }
        } catch (error) {
            console.error('Error fetching leave balances:', error);
        }
    };

    const fetchAvailableLeaveTypes = async () => {
        try {
            const response = await getRequest('/v1/leave/types/available');
            if (response?.success && response?.leave_types) {
                setAvailableLeaveTypes(response.leave_types);
            } else {
                setAvailableLeaveTypes([]);
                if (response?.error) {
                    console.log('No available leaves:', response.error);
                }
            }
        } catch (error) {
            console.error('Error fetching available leave types:', error);
            setAvailableLeaveTypes([]);
        }
    };

    const handleCreateLeave = async () => {
        if (!leaveFormData.leave_type_id || !leaveFormData.from_date || !leaveFormData.to_date || !leaveFormData.reason) {
            Swal.fire('Error', 'Please fill in all required fields', 'error');
            return;
        }

        // Check if user has sufficient balance
        const selectedLeaveType = availableLeaveTypes.find(type => type.id === parseInt(leaveFormData.leave_type_id));
        if (selectedLeaveType && selectedLeaveType.remaining <= 0) {
            Swal.fire('Error', 'Insufficient leave balance. Please contact HR for leave allocation.', 'error');
            return;
        }

        const payload = { ...leaveFormData };

        setIsSaving(true);
        try {
            const response = await postRequest('/v1/leave/create', payload);
            if (response?.success) {
                Swal.fire('Success', 'Leave request created successfully', 'success');
                setShowLeaveModal(false);
                setLeaveFormData({ user_id: '', leave_type_id: '', from_date: '', to_date: '', day_type: 'full', reason: '' });
                fetchLeaveRequests();
                fetchLeaveBalances();
                fetchAvailableLeaveTypes();
            } else {
                const errorMsg = response?.error || response?.message || 'Failed to create leave';
                Swal.fire('Error', errorMsg, 'error');
            }
        } catch (error: any) {
            const errorMsg = error?.response?.data?.error || error?.response?.data?.message || error?.message || 'An error occurred';
            Swal.fire('Error', errorMsg, 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleApprove = async (requestId: number) => {
        try {
            const response = await putRequest(`/v1/leave/requests/${requestId}/status`, { status: 'approved' });
            if (response?.success) {
                Swal.fire('Success', 'Leave request approved', 'success');
                fetchLeaveRequests();
            } else {
                Swal.fire('Error', response?.message || 'Failed to approve', 'error');
            }
        } catch (error: any) {
            Swal.fire('Error', error?.message || 'An error occurred', 'error');
        }
    };

    const handleReject = (requestId: number) => {
        setRejectRequestId(requestId);
        setRejectionReason('');
        setShowRejectModal(true);
    };

    const submitRejection = async () => {
        if (!rejectionReason.trim()) {
            Swal.fire('Error', 'Please provide a reason for rejection', 'error');
            return;
        }

        setIsSaving(true);
        try {
            const response = await putRequest(`/v1/leave/requests/${rejectRequestId}/status`, { 
                status: 'rejected',
                rejection_reason: rejectionReason 
            });
            if (response?.success) {
                Swal.fire('Success', 'Leave request rejected', 'success');
                setShowRejectModal(false);
                setRejectRequestId(null);
                setRejectionReason('');
                fetchLeaveRequests();
            } else {
                Swal.fire('Error', response?.message || 'Failed to reject', 'error');
            }
        } catch (error: any) {
            Swal.fire('Error', error?.message || 'An error occurred', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSetDefaultAllocation = async (type: any) => {
        const { value: formValues } = await Swal.fire({
            title: `Set Default Allocation for ${type.leaveTypeName}`,
            html: `
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <div style="flex: 1;">
                        <label style="display: block; text-align: left; margin-bottom: 5px; font-weight: 600;">Days *</label>
                        <input id="swal-days" type="number" step="0.1" min="0" placeholder="e.g., 10" class="swal2-input" style="margin: 0; width: 100%;" required>
                    </div>
                    <div style="flex: 1;">
                        <label style="display: block; text-align: left; margin-bottom: 5px; font-weight: 600;">Year *</label>
                        <input id="swal-year" type="number" min="1900" max="2100" placeholder="e.g., 2025" class="swal2-input" style="margin: 0; width: 100%;" required>
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Allocate',
            focusConfirm: false,
            preConfirm: () => {
                const days = (document.getElementById('swal-days') as HTMLInputElement).value;
                const year = (document.getElementById('swal-year') as HTMLInputElement).value;
                const daysNum = parseFloat(days);
                const yearNum = parseInt(year);
                
                if (!days || isNaN(daysNum) || daysNum <= 0) {
                    Swal.showValidationMessage('Please enter a valid number of days');
                    return false;
                }
                if (!year || isNaN(yearNum) || year.length !== 4) {
                    Swal.showValidationMessage('Please enter a valid 4-digit year');
                    return false;
                }
                return { days: daysNum, year: yearNum };
            }
        });

        if (formValues) {
            try {
                const response = await postRequest('/v1/leave/types/set-default-allocation', {
                    leaveTypeId: type.leaveTypeId,
                    days: formValues.days,
                    year: formValues.year
                });
                if (response?.success) {
                    Swal.fire('Success', `Allocated ${formValues.days} days to all users for year ${formValues.year}`, 'success');
                    fetchLeaveTypes();
                } else {
                    Swal.fire('Error', response?.message || 'Failed to set allocation', 'error');
                }
            } catch (error: any) {
                Swal.fire('Error', error?.message || 'An error occurred', 'error');
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Leave Management</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your leave requests and balances</p>
                </div>
                {userRole !== 'Admin' && userRole !== 'HR' && (
                    <button className="btn btn-primary" onClick={() => setShowLeaveModal(true)}>
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Create Leave Request
                    </button>
                )}
            </div>

            <div className="panel">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5"/>
                                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div>
                            <h5 className="font-semibold text-lg">Leave Types</h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Available leave categories</p>
                        </div>
                    </div>
                    {(userRole === 'Admin' || userRole === 'HR') && (
                        <button className="btn btn-primary" onClick={openAddModal}>
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            Add Leave Type
                        </button>
                    )}
                </div>

                <div className="overflow-x-auto pb-4 custom-scrollbar">
                    <style>{`
                        .custom-scrollbar::-webkit-scrollbar {
                            height: 6px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-track {
                            background: transparent;
                            margin: 0 10px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb {
                            background: linear-gradient(90deg, #4361ee 0%, #7c3aed 100%);
                            border-radius: 20px;
                            transition: all 0.3s ease;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: linear-gradient(90deg, #3451d1 0%, #6d28d9 100%);
                            height: 8px;
                        }
                        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                            background: linear-gradient(90deg, #4361ee 0%, #7c3aed 100%);
                            box-shadow: 0 0 10px rgba(67, 97, 238, 0.3);
                        }
                        .custom-scrollbar {
                            scrollbar-width: thin;
                            scrollbar-color: #4361ee transparent;
                        }
                    `}</style>
                    {loading ? (
                        <div className="text-center py-8">Loading...</div>
                    ) : leaveTypes.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5"/>
                                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">No leave types found</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Click "Add Leave Type" to create one</p>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            {leaveTypes.map((type) => (
                                <div key={type.leaveTypeId} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-col w-80 flex-shrink-0">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                                                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5"/>
                                                        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h6 className="font-semibold">{type.leaveTypeName}</h6>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${(type.leaveTypeDefaultAllocation && type.leaveTypeDefaultAllocation > 0) ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                                        {(type.leaveTypeDefaultAllocation && type.leaveTypeDefaultAllocation > 0) ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 backdrop-blur-sm space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Paid:</span>
                                                <span className="text-xs font-semibold">{!!type.leaveTypeIsPaid ? 'Yes' : 'No'}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Encashable:</span>
                                                <span className="text-xs font-semibold">{!!type.leaveTypeIsEncashable ? 'Yes' : 'No'}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Approval Required:</span>
                                                <span className="text-xs font-semibold">{!!type.leaveTypeRequireApproval ? 'Yes' : 'No'}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Attachment Required:</span>
                                                <span className="text-xs font-semibold">{!!type.leaveTypeRequireAttachment ? 'Yes' : 'No'}</span>
                                            </div>
                                            {(userRole === 'Admin' || userRole === 'HR') ? (
                                                <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                                                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Default Leave:</span>
                                                    <span className="text-xs font-bold text-primary">{type.leaveTypeDefaultAllocation || 0} {(type.leaveTypeDefaultAllocation || 0) === 1 ? 'day' : 'days'}</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Your Balance:</span>
                                                        <span className="text-xs font-bold text-green-600 dark:text-green-400">
                                                            {(() => {
                                                                const balance = leaveBalances.find(b => b.leave_type_id === type.leaveTypeId);
                                                                const days = balance?.remaining ?? 0;
                                                                return `${days} ${days === 1 ? 'day' : 'days'}`;
                                                            })()}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center pt-1">
                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Used Leave:</span>
                                                        <span className="text-xs font-bold text-red-600 dark:text-red-400">
                                                            {(() => {
                                                                const balance = leaveBalances.find(b => b.leave_type_id === type.leaveTypeId);
                                                                const used = balance?.used ?? 0;
                                                                return `${used} ${used === 1 ? 'day' : 'days'}`;
                                                            })()}
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {(userRole === 'Admin' || userRole === 'HR') && (
                                        <div className="space-y-2 mt-4">
                                            <button className="btn btn-sm btn-success w-full" onClick={() => handleSetDefaultAllocation(type)}>
                                                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                Set Default
                                            </button>
                                            <div className="flex gap-2">
                                                <button className="btn btn-sm btn-primary flex-1" onClick={() => handleEdit(type)}>
                                                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    Edit
                                                </button>
                                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(type)}>
                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {userRole !== 'Admin' && userRole !== 'HR' && (
                <div className="panel">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div>
                                <h5 className="font-semibold text-lg">My Leave Requests</h5>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Your leave applications</p>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10">
                                    <th className="text-left p-4 font-semibold text-sm">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                                                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5"/>
                                            </svg>
                                            Leave Type
                                        </div>
                                    </th>
                                    <th className="text-left p-4 font-semibold text-sm">From Date</th>
                                    <th className="text-left p-4 font-semibold text-sm">To Date</th>
                                    <th className="text-center p-4 font-semibold text-sm">Days</th>
                                    <th className="text-center p-4 font-semibold text-sm">Status</th>
                                    <th className="text-left p-4 font-semibold text-sm">Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaveRequests.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-12">
                                            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <p className="text-gray-500 dark:text-gray-400 font-medium">No leave requests found</p>
                                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Create your first leave request</p>
                                        </td>
                                    </tr>
                                ) : (
                                    leaveRequests.map((request) => (
                                        <tr key={request.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="p-4">
                                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary rounded-lg text-sm font-medium">
                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                                                        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5"/>
                                                    </svg>
                                                    {request.leave_type_name || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                                                        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                    </svg>
                                                    {new Date(request.from_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                                                        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                    </svg>
                                                    {new Date(request.to_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold">
                                                    {request.days || 1}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                                                    request.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                    request.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                }`}>
                                                    {request.status === 'approved' && (
                                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    )}
                                                    {request.status === 'rejected' && (
                                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    )}
                                                    {request.status === 'pending' && (
                                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                                            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                        </svg>
                                                    )}
                                                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {request.status === 'rejected' && request.rejection_reason ? (
                                                    <div className="text-sm">
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded">
                                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                            {request.rejection_reason}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-gray-400">-</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {(userRole === 'Admin' || userRole === 'HR') && (
                <div className="panel">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div>
                                <h5 className="font-semibold text-lg">Leave Requests</h5>
                                <p className="text-xs text-gray-500 dark:text-gray-400">All employee leave applications</p>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10">
                                    <th className="text-left p-4 font-semibold text-sm">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            Employee
                                        </div>
                                    </th>
                                    <th className="text-left p-4 font-semibold text-sm">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                                                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5"/>
                                            </svg>
                                            Leave Type
                                        </div>
                                    </th>
                                    <th className="text-left p-4 font-semibold text-sm">From Date</th>
                                    <th className="text-left p-4 font-semibold text-sm">To Date</th>
                                    <th className="text-center p-4 font-semibold text-sm">Days</th>
                                    <th className="text-center p-4 font-semibold text-sm">Status</th>
                                    <th className="text-center p-4 font-semibold text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaveRequests.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-12">
                                            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <p className="text-gray-500 dark:text-gray-400 font-medium">No leave requests found</p>
                                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Leave requests will appear here</p>
                                        </td>
                                    </tr>
                                ) : (
                                    leaveRequests.map((request, index) => (
                                        <tr key={request.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                                                        {request.user_name?.charAt(0) || 'U'}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold">{request.user_name || 'Unknown'}</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">ID: {request.user_id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary rounded-lg text-sm font-medium">
                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                                                        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5"/>
                                                    </svg>
                                                    {request.leave_type_name || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                                                        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                    </svg>
                                                    {new Date(request.from_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                                                        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                    </svg>
                                                    {new Date(request.to_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold">
                                                    {request.days || 1}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                                                    request.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                    request.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                }`}>
                                                    {request.status === 'approved' && (
                                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    )}
                                                    {request.status === 'rejected' && (
                                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    )}
                                                    {request.status === 'pending' && (
                                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                                            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                        </svg>
                                                    )}
                                                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    {request.status === 'pending' ? (
                                                        <>
                                                            <button className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-0" onClick={() => handleApprove(request.id)} title="Approve">
                                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                </svg>
                                                            </button>
                                                            <button className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-0" onClick={() => handleReject(request.id)} title="Reject">
                                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                </svg>
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <span className="text-xs text-gray-400">-</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Create Leave Request Modal */}
            {showLeaveModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl">
                        <div className="bg-gradient-to-r from-primary to-purple-600 p-6">
                            <h3 className="text-2xl font-bold text-white">Create Leave Request</h3>
                            <p className="text-white/80 text-sm mt-1">Submit a new leave application</p>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            {currentUser && (
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Employee Name</label>
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold">
                                            {currentUser.name?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <div className="font-semibold">{currentUser.name || 'User'}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">ID: {currentUser.id}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold mb-2">Leave Type *</label>
                                {availableLeaveTypes.length === 0 ? (
                                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                        <p className="text-sm text-red-600 dark:text-red-400 font-medium">No leave available. Please contact HR.</p>
                                    </div>
                                ) : (
                                    <select
                                        className="form-select w-full"
                                        value={leaveFormData.leave_type_id}
                                        onChange={(e) => setLeaveFormData({ ...leaveFormData, leave_type_id: e.target.value })}
                                    >
                                        <option value="">Select leave type</option>
                                        {availableLeaveTypes.map((type) => (
                                            <option key={type.id} value={type.id}>
                                                {type.name} (Available: {type.remaining} {type.remaining === 1 ? 'day' : 'days'})
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">From Date *</label>
                                    <input
                                        type="date"
                                        className="form-input w-full"
                                        value={leaveFormData.from_date}
                                        onChange={(e) => setLeaveFormData({ ...leaveFormData, from_date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">To Date *</label>
                                    <input
                                        type="date"
                                        className="form-input w-full"
                                        value={leaveFormData.to_date}
                                        onChange={(e) => setLeaveFormData({ ...leaveFormData, to_date: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Day Type *</label>
                                <select
                                    className="form-select w-full"
                                    value={leaveFormData.day_type}
                                    onChange={(e) => setLeaveFormData({ ...leaveFormData, day_type: e.target.value })}
                                >
                                    <option value="full">Full Day</option>
                                    <option value="half">Half Day</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Reason *</label>
                                <textarea
                                    className="form-textarea w-full"
                                    rows={3}
                                    placeholder="Enter reason for leave"
                                    value={leaveFormData.reason}
                                    onChange={(e) => setLeaveFormData({ ...leaveFormData, reason: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                            <button className="btn btn-outline-danger" onClick={() => setShowLeaveModal(false)} disabled={isSaving}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleCreateLeave} disabled={isSaving}>
                                {isSaving ? 'Creating...' : 'Submit Leave Request'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Leave Type Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                        <div className="bg-gradient-to-r from-primary to-purple-600 p-6">
                            <h3 className="text-2xl font-bold text-white">{editMode ? 'Edit Leave Type' : 'Add Leave Type'}</h3>
                            <p className="text-white/80 text-sm mt-1">Configure leave type settings and properties</p>
                        </div>
                        
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                            <div className="space-y-6">
                                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                                    <h4 className="text-sm font-bold text-primary mb-3 flex items-center">
                                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        Basic Information
                                    </h4>
                                    <div>
                                        <label className="block text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">Leave Type Name *</label>
                                        <input
                                            type="text"
                                            className="form-input w-full"
                                            placeholder="e.g., Annual Leave, Sick Leave, Maternity Leave"
                                            value={formData.leaveTypeName}
                                            onChange={(e) => setFormData({ ...formData, leaveTypeName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                                    <h4 className="text-sm font-bold text-primary mb-3 flex items-center">
                                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 12.75L11.25 15L15 9.75M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        Leave Properties
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all hover:border-primary/50 bg-white dark:bg-gray-800">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox text-primary"
                                                checked={formData.leaveTypeIsPaid}
                                                onChange={(e) => setFormData({ ...formData, leaveTypeIsPaid: e.target.checked })}
                                            />
                                            <div className="ml-3">
                                                <span className="font-medium text-sm">Paid Leave</span>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Employee receives salary during leave</p>
                                            </div>
                                        </label>

                                        <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all hover:border-primary/50 bg-white dark:bg-gray-800">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox text-primary"
                                                checked={formData.leaveTypeIsEncashable}
                                                onChange={(e) => setFormData({ ...formData, leaveTypeIsEncashable: e.target.checked })}
                                            />
                                            <div className="ml-3">
                                                <span className="font-medium text-sm">Encashable</span>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Unused leave can be converted to cash</p>
                                            </div>
                                        </label>

                                        <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all hover:border-primary/50 bg-white dark:bg-gray-800">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox text-primary"
                                                checked={formData.leaveTypeRequireApproval}
                                                onChange={(e) => setFormData({ ...formData, leaveTypeRequireApproval: e.target.checked })}
                                            />
                                            <div className="ml-3">
                                                <span className="font-medium text-sm">Requires Approval</span>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Manager approval needed before leave</p>
                                            </div>
                                        </label>

                                        <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all hover:border-primary/50 bg-white dark:bg-gray-800">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox text-primary"
                                                checked={formData.leaveTypeRequireAttachment}
                                                onChange={(e) => setFormData({ ...formData, leaveTypeRequireAttachment: e.target.checked })}
                                            />
                                            <div className="ml-3">
                                                <span className="font-medium text-sm">Requires Attachment</span>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Supporting documents must be uploaded</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                            <button className="btn btn-outline-danger" onClick={() => setShowModal(false)} disabled={isSaving}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
                                {isSaving ? (
                                    <>
                                        <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {editMode ? 'Updating...' : 'Creating...'}
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        {editMode ? 'Update Leave Type' : 'Create Leave Type'}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Rejection Reason Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
                        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
                            <h3 className="text-2xl font-bold text-white">Reject Leave Request</h3>
                            <p className="text-white/80 text-sm mt-1">Please provide a reason for rejection</p>
                        </div>
                        
                        <div className="p-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Rejection Reason *</label>
                                <textarea
                                    className="form-textarea w-full"
                                    rows={4}
                                    placeholder="Enter reason for rejecting this leave request..."
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                            <button 
                                className="btn btn-outline-secondary" 
                                onClick={() => {
                                    setShowRejectModal(false);
                                    setRejectRequestId(null);
                                    setRejectionReason('');
                                }} 
                                disabled={isSaving}
                            >
                                Cancel
                            </button>
                            <button 
                                className="btn bg-red-500 hover:bg-red-600 text-white border-0" 
                                onClick={submitRejection} 
                                disabled={isSaving}
                            >
                                {isSaving ? 'Rejecting...' : 'Reject Leave'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaveManagement;