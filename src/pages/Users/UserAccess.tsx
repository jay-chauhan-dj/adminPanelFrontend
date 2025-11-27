import { useState, useEffect } from 'react';
import { getRequest, postRequest, putRequest, deleteRequest } from '../../utils/Request';

const UserAccess = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [roles, setRoles] = useState<any[]>([]);
    const [availableAreas, setAvailableAreas] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentRole, setCurrentRole] = useState({ id: null, role: '', access_area: [] });
    const [currentUser, setCurrentUser] = useState({ userId: null, role: '', customAreas: [], roleAreas: [] });
    const [newUser, setNewUser] = useState({ userFirstName: '', userLastName: '', userEmail: '', userPhoneNumber: '', userWhatsappNumber: '', userAddress: { 'address-1': '', 'address-2': '', landmark: '', city: '', state: '', country: '', 'postal-code': '' }, userLogin: '', userPassword: '', userRole: '', customAreas: [], roleAreas: [] });

    useEffect(() => {
        fetchUsers();
        fetchRoles();
        fetchAvailableAreas();
    }, []);

    const fetchAvailableAreas = async () => {
        // Only your actual sidebar pages
        setAvailableAreas([
            'dashboard',
            'chat',
            'payment',
            'money',
            'nas',
            'websiteContact',
            'users'
        ]);
    };

    const fetchUsers = async () => {
        try {
            const response = await getRequest('/v1/users-access');
            console.log('Users response:', response);
            if (response?.data && Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                console.error('Invalid users response:', response);
                setUsers([]);
            }
        } catch (error: any) {
            console.error('Error fetching users:', error);
            alert('Failed to fetch users: ' + (error?.response?.data?.message || error.message));
            setUsers([]);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await getRequest('/v1/user-access');
            console.log('Roles response:', response);
            if (response?.data && Array.isArray(response.data)) {
                setRoles(response.data);
            } else {
                console.error('Invalid roles response:', response);
                setRoles([]);
            }
        } catch (error: any) {
            console.error('Error fetching roles:', error);
            alert('Failed to fetch roles: ' + (error?.response?.data?.message || error.message));
            setRoles([]);
        }
    };

    const handleCheckbox = (area: string) => {
        setCurrentRole(prev => ({
            ...prev,
            access_area: prev.access_area.includes(area)
                ? prev.access_area.filter((a: string) => a !== area)
                : [...prev.access_area, area]
        }));
    };

    const handleSubmit = async () => {
        if (editMode) {
            await putRequest(`/v1/user-access/${currentRole.id}`, currentRole);
        } else {
            await postRequest('/v1/user-access', currentRole);
        }
        setShowModal(false);
        setCurrentRole({ id: null, role: '', access_area: [] });
        await fetchRoles();
        await fetchUsers();
    };

    const handleUserRoleUpdate = async () => {
        const selectedRole = roles.find(r => r.role === currentUser.role);
        const roleAreas = selectedRole ? selectedRole.access_area : [];
        const extraAreas = currentUser.customAreas.filter(area => !roleAreas.includes(area));
        
        await putRequest(`/v1/users-access/${currentUser.userId}`, { role: currentUser.role, customAreas: extraAreas });
        setShowUserModal(false);
        setCurrentUser({ userId: null, role: '', customAreas: [], roleAreas: [] });
        fetchUsers();
    };

    const handleDeleteUser = async (userId: number) => {
        if (confirm('Delete this user? This action cannot be undone.')) {
            await deleteRequest(`/v1/users-access/${userId}`);
            fetchUsers();
        }
    };

    const openUserModal = (user: any) => {
        const selectedRole = roles.find(r => r.role === user.userRole);
        const roleAreas = selectedRole ? selectedRole.access_area : [];
        setCurrentUser({ 
            userId: user.userId, 
            role: user.userRole, 
            customAreas: user.access_area || [],
            roleAreas: roleAreas
        });
        setShowUserModal(true);
    };

    const handleUserCheckbox = (area: string) => {
        setCurrentUser(prev => ({
            ...prev,
            customAreas: prev.customAreas.includes(area)
                ? prev.customAreas.filter((a: string) => a !== area)
                : [...prev.customAreas, area]
        }));
    };

    const handleEdit = (role: any) => {
        setCurrentRole(role);
        setEditMode(true);
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Delete this role?')) {
            await deleteRequest(`/v1/user-access/${id}`);
            await fetchRoles();
            await fetchUsers();
        }
    };

    const openAddModal = () => {
        setCurrentRole({ id: null, role: '', access_area: [] });
        setEditMode(false);
        setShowModal(true);
    };

    //  Add User Modal Handlers
    const openAddUserModal = () => {
        setNewUser({ userFirstName: '', userLastName: '', userEmail: '', userPhoneNumber: '', userWhatsappNumber: '', userAddress: { 'address-1': '', 'address-2': '', landmark: '', city: '', state: '', country: '', 'postal-code': '' }, userLogin: '', userPassword: '', userRole: '', customAreas: [], roleAreas: [] });
        setShowAddUserModal(true);
    };

    const handleAddUser = async () => {
        try {
            const userData = {
                ...newUser,
                userAddress: JSON.stringify(newUser.userAddress)
            };
            await postRequest('/v1/users-access/create', userData);
            setShowAddUserModal(false);
            setNewUser({ userFirstName: '', userLastName: '', userEmail: '', userPhoneNumber: '', userWhatsappNumber: '', userAddress: { 'address-1': '', 'address-2': '', landmark: '', city: '', state: '', country: '', 'postal-code': '' }, userLogin: '', userPassword: '', userRole: '', customAreas: [], roleAreas: [] });
            await fetchUsers();
            alert('User created successfully!');
        } catch (error: any) {
            alert('Failed to create user: ' + (error?.response?.data?.message || error.message));
        }
    };

    const handleNewUserCheckbox = (area: string) => {
        setNewUser(prev => ({
            ...prev,
            customAreas: prev.customAreas.includes(area)
                ? prev.customAreas.filter((a: string) => a !== area)
                : [...prev.customAreas, area]
        }));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Access Control</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage user roles and permissions</p>
                </div>
            </div>

            {/* Users Section */}
            <div className="panel">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20M21 17.0004C21 15.7702 19.7659 14.7129 18 14.25M3 17.0004C3 15.7702 4.2341 14.7129 6 14.25M18 10.2361C18.6137 9.68679 19 8.8885 19 8C19 6.34315 17.6569 5 16 5C15.2316 5 14.5308 5.28885 14 5.76389M6 10.2361C5.38625 9.68679 5 8.8885 5 8C5 6.34315 6.34315 5 8 5C8.76835 5 9.46924 5.28885 10 5.76389M12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div>
                            <h5 className="font-semibold text-lg">Users</h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Assign roles to users</p>
                        </div>
                    </div>
                    {/* Add User Button */}
                    <button className="btn btn-primary" onClick={openAddUserModal}>
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Add User
                    </button>
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
                    <div className="flex gap-4">
                    {users.map((user) => (
                        <div key={user.userId} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-col w-80 flex-shrink-0">
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                                            {user.userFirstName?.charAt(0)}{user.userLastName?.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h6 className="font-semibold">{user.userFirstName} {user.userLastName}</h6>
                                                {user.userIsEmailVerified === '1' && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" title="Email Verified">
                                                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                        Verified
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{user.userEmail}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-info/10 text-info">
                                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5"/>
                                            <path d="M12 22C17 22 22 17 22 12C22 7 17 2 12 2C7 2 2 7 2 12C2 17 7 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
                                        </svg>
                                        {user.userRole || 'No Role'}
                                    </span>
                                </div>
                                <div className="mb-3">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Access Areas:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {user.access_area?.length > 0 ? user.access_area.map((area: string) => (
                                            <span key={area} className="px-2 py-1 rounded text-xs bg-primary/10 text-primary">{area}</span>
                                        )) : <span className="text-xs text-gray-400">No access</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-auto">
                                <button className="btn btn-sm btn-primary flex-1" onClick={() => openUserModal(user)}>
                                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5"/>
                                    </svg>
                                    Change Role
                                </button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(user.userId)} title="Delete User">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>

            {/* Roles Section */}
            <div className="panel">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                            <svg className="w-6 h-6 text-success" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 12.75L11.25 15L15 9.75M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div>
                            <h5 className="font-semibold text-lg">Roles</h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Define roles and permissions</p>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={openAddModal}>
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Add Role
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roles.map((role) => (
                        <div key={role.id} className="relative border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-xl transition-all bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-success/10 to-transparent rounded-full -mr-16 -mt-16"></div>
                            <div className="relative">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success to-emerald-600 flex items-center justify-center shadow-lg">
                                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 12.75L11.25 15L15 9.75M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h6 className="font-bold text-xl mb-1 bg-gradient-to-r from-success to-emerald-600 bg-clip-text text-transparent">{role.role}</h6>
                                            <p className="text-xs font-medium text-gray-600 dark:text-gray-300">{role.access_area.length} permissions granted</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-all hover:scale-110" onClick={() => handleEdit(role)} title="Edit">
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-danger/10 text-danger transition-all hover:scale-110" onClick={() => handleDelete(role.id)} title="Delete">
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 backdrop-blur-sm">
                                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Permissions:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {role.access_area.map((area: string) => (
                                            <span key={area} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-success to-emerald-600 text-white shadow-md capitalize">{area}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Role Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden" onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}>
                        <div className="bg-gradient-to-r from-primary to-purple-600 p-6">
                            <h3 className="text-2xl font-bold text-white">{editMode ? 'Edit Role' : 'Create New Role'}</h3>
                            <p className="text-white/80 text-sm mt-1">Define role name and assign permissions</p>
                        </div>
                        
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                            <div className="mb-6">
                                <label className="block text-sm font-semibold mb-2">Role Name</label>
                                <input
                                    type="text"
                                    className="form-input w-full"
                                    placeholder="e.g., Manager, Editor, Viewer"
                                    value={currentRole.role}
                                    onChange={(e) => setCurrentRole({ ...currentRole, role: e.target.value })}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleSubmit();
                                        }
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-3">Permissions</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {availableAreas.map((area) => (
                                        <label key={area} className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                                            currentRole.access_area.includes(area) 
                                                ? 'border-primary bg-primary/5' 
                                                : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                                        }`}>
                                            <input
                                                type="checkbox"
                                                className="form-checkbox text-primary"
                                                checked={currentRole.access_area.includes(area)}
                                                onChange={() => handleCheckbox(area)}
                                            />
                                            <span className="ml-2 capitalize font-medium text-sm">{area}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                            <button className="btn btn-outline-danger" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                {editMode ? 'Update Role' : 'Create Role'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add User Modal */}
            {showAddUserModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                        <style>{`
                            .modal-scrollbar::-webkit-scrollbar {
                                width: 6px;
                            }
                            .modal-scrollbar::-webkit-scrollbar-track {
                                background: transparent;
                            }
                            .modal-scrollbar::-webkit-scrollbar-thumb {
                                background: linear-gradient(180deg, #4361ee 0%, #7c3aed 100%);
                                border-radius: 20px;
                            }
                            .modal-scrollbar::-webkit-scrollbar-thumb:hover {
                                background: linear-gradient(180deg, #3451d1 0%, #6d28d9 100%);
                            }
                            .dark .modal-scrollbar::-webkit-scrollbar-thumb {
                                background: linear-gradient(180deg, #4361ee 0%, #7c3aed 100%);
                                box-shadow: 0 0 10px rgba(67, 97, 238, 0.3);
                            }
                        `}</style>
                        <div className="bg-gradient-to-r from-primary to-purple-600 p-6">
                            <h3 className="text-2xl font-bold text-white">Add New User</h3>
                            <p className="text-white/80 text-sm mt-1">Fill in the details to create a new user</p>
                        </div>
                        
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] modal-scrollbar">
                                <div className="space-y-5">
                                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                                        <h4 className="text-sm font-bold text-primary mb-3 flex items-center">
                                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2"/>
                                                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2"/>
                                            </svg>
                                            Personal Information
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-semibold mb-1.5 text-gray-700 dark:text-gray-300">First Name *</label>
                                                <input type="text" className="form-input w-full" placeholder="First Name" value={newUser.userFirstName} onChange={(e) => setNewUser({...newUser, userFirstName: e.target.value})} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold mb-1.5 text-gray-700 dark:text-gray-300">Last Name *</label>
                                                <input type="text" className="form-input w-full" placeholder="Last Name" value={newUser.userLastName} onChange={(e) => setNewUser({...newUser, userLastName: e.target.value})} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                                        <h4 className="text-sm font-bold text-primary mb-3 flex items-center">
                                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                            Contact Details
                                        </h4>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-xs font-semibold mb-1.5 text-gray-700 dark:text-gray-300">Email *</label>
                                                <input type="email" className="form-input w-full" placeholder="user@example.com" value={newUser.userEmail} onChange={(e) => setNewUser({...newUser, userEmail: e.target.value})} />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-xs font-semibold mb-1.5 text-gray-700 dark:text-gray-300">Phone Number *</label>
                                                    <input type="text" className="form-input w-full" placeholder="Phone Number" maxLength={10} value={newUser.userPhoneNumber} onChange={(e) => setNewUser({...newUser, userPhoneNumber: e.target.value.replace(/\D/g, '')})} />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold mb-1.5 text-gray-700 dark:text-gray-300">WhatsApp Number *</label>
                                                    <input type="text" className="form-input w-full" placeholder="WhatsApp Number" maxLength={10} value={newUser.userWhatsappNumber} onChange={(e) => setNewUser({...newUser, userWhatsappNumber: e.target.value.replace(/\D/g, '')})} />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">Address Line 1 *</label>
                                                        <input type="text" className="form-input w-full" placeholder="Street address" value={newUser.userAddress['address-1']} onChange={(e) => setNewUser({...newUser, userAddress: {...newUser.userAddress, 'address-1': e.target.value}})} />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">Address Line 2</label>
                                                        <input type="text" className="form-input w-full" placeholder="Apartment, suite, etc." value={newUser.userAddress['address-2']} onChange={(e) => setNewUser({...newUser, userAddress: {...newUser.userAddress, 'address-2': e.target.value}})} />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">Landmark</label>
                                                        <input type="text" className="form-input w-full" placeholder="Nearby landmark" value={newUser.userAddress.landmark} onChange={(e) => setNewUser({...newUser, userAddress: {...newUser.userAddress, landmark: e.target.value}})} />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">City *</label>
                                                        <input type="text" className="form-input w-full" placeholder="City" value={newUser.userAddress.city} onChange={(e) => setNewUser({...newUser, userAddress: {...newUser.userAddress, city: e.target.value}})} />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2">
                                                    <div>
                                                        <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">State *</label>
                                                        <input type="text" className="form-input w-full" placeholder="State" value={newUser.userAddress.state} onChange={(e) => setNewUser({...newUser, userAddress: {...newUser.userAddress, state: e.target.value}})} />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">Country *</label>
                                                        <input type="text" className="form-input w-full" placeholder="Country" value={newUser.userAddress.country} onChange={(e) => setNewUser({...newUser, userAddress: {...newUser.userAddress, country: e.target.value}})} />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">Postal Code *</label>
                                                        <input type="text" className="form-input w-full" placeholder="Postal code" maxLength={6} value={newUser.userAddress['postal-code']} onChange={(e) => setNewUser({...newUser, userAddress: {...newUser.userAddress, 'postal-code': e.target.value.replace(/\D/g, '')}})} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                                        <h4 className="text-sm font-bold text-primary mb-3 flex items-center">
                                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7V11H16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                            Login Credentials
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-semibold mb-1.5 text-gray-700 dark:text-gray-300">Username *</label>
                                                <input type="text" className="form-input w-full" placeholder="username" maxLength={16} value={newUser.userLogin} onChange={(e) => setNewUser({...newUser, userLogin: e.target.value})} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold mb-1.5 text-gray-700 dark:text-gray-300">Password *</label>
                                                <input type="password" className="form-input w-full" placeholder="Password" value={newUser.userPassword} onChange={(e) => setNewUser({...newUser, userPassword: e.target.value})} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                                        <h4 className="text-sm font-bold text-primary mb-3 flex items-center">
                                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 12.75L11.25 15L15 9.75M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                            Role & Permissions
                                        </h4>
                                        <div className="mb-3">
                                            <label className="block text-xs font-semibold mb-1.5 text-gray-700 dark:text-gray-300">Assign Role</label>
                                            <select className="form-select w-full" value={newUser.userRole} onChange={(e) => {
                                                const selectedRole = roles.find(r => r.role === e.target.value);
                                                const roleAreas = selectedRole ? selectedRole.access_area : [];
                                                setNewUser({...newUser, userRole: e.target.value, roleAreas: roleAreas});
                                            }}>
                                                <option value="">Select role</option>
                                                {roles.map((role) => (<option key={role.id} value={role.role}>{role.role}</option>))}
                                            </select>
                                        </div>
                                        {newUser.roleAreas.length > 0 && (
                                            <div className="mb-3">
                                                <label className="block text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">Role Permissions (Default)</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {newUser.roleAreas.map((area) => (
                                                        <div key={area} className="flex items-center p-2 border border-success/30 bg-success/5 rounded-lg">
                                                            <svg className="w-3 h-3 text-success mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                            </svg>
                                                            <span className="capitalize text-xs font-medium text-success">{area}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        <div>
                                            <label className="block text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">Additional Access</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {availableAreas.filter(area => !newUser.roleAreas.includes(area)).map((area) => (
                                                    <label key={area} className={`flex items-center p-2 border rounded-lg cursor-pointer transition ${newUser.customAreas.includes(area) ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'}`}>
                                                        <input type="checkbox" className="form-checkbox text-primary" checked={newUser.customAreas.includes(area)} onChange={() => handleNewUserCheckbox(area)} />
                                                        <span className="ml-2 capitalize text-xs font-medium">{area}</span>
                                                    </label>
                                                ))}
                                                {availableAreas.filter(area => !newUser.roleAreas.includes(area)).length === 0 && newUser.roleAreas.length > 0 && (
                                                    <p className="text-xs text-gray-400 col-span-2">All permissions granted by role</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                            <button className="btn btn-outline-danger" onClick={() => setShowAddUserModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleAddUser}>
                                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                                Create User
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* User Role Modal */}
            {showUserModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
                        <div className="bg-gradient-to-r from-info to-blue-600 p-6">
                            <h3 className="text-2xl font-bold text-white">Change User Role</h3>
                            <p className="text-white/80 text-sm mt-1">Assign a new role to this user</p>
                        </div>
                        
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
                            <div className="mb-6">
                                <label className="block text-sm font-semibold mb-2">Select Role</label>
                                <select
                                    className="form-select w-full"
                                    value={currentUser.role}
                                    onChange={(e) => {
                                        const selectedRole = roles.find(r => r.role === e.target.value);
                                        const newRoleAreas = selectedRole ? selectedRole.access_area : [];
                                        const keptCustomAreas = currentUser.customAreas.filter(area => newRoleAreas.includes(area));
                                        setCurrentUser({ 
                                            ...currentUser, 
                                            role: e.target.value,
                                            roleAreas: newRoleAreas,
                                            customAreas: keptCustomAreas
                                        });
                                    }}
                                >
                                    <option value="">Choose a role...</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.role}>{role.role}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-3">Role Permissions</label>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Permissions from assigned role (read-only)</p>
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {currentUser.roleAreas.map((area) => (
                                        <div key={area} className="flex items-center p-3 border-2 border-success/30 bg-success/5 rounded-lg">
                                            <svg className="w-4 h-4 text-success mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span className="capitalize font-medium text-sm text-success">{area}</span>
                                        </div>
                                    ))}
                                    {currentUser.roleAreas.length === 0 && (
                                        <p className="text-xs text-gray-400 col-span-2">No role assigned</p>
                                    )}
                                </div>

                                <label className="block text-sm font-semibold mb-3">Additional Permissions</label>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Add extra permissions beyond role access</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {availableAreas.filter(area => !currentUser.roleAreas.includes(area)).map((area) => {
                                        const isChecked = currentUser.customAreas.includes(area);
                                        return (
                                            <label key={area} className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                                                isChecked 
                                                    ? 'border-primary bg-primary/5' 
                                                    : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                                            }`}>
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-primary"
                                                    checked={isChecked}
                                                    onChange={() => handleUserCheckbox(area)}
                                                />
                                                <span className="ml-2 capitalize font-medium text-sm">{area}</span>
                                            </label>
                                        );
                                    })}
                                    {availableAreas.filter(area => !currentUser.roleAreas.includes(area)).length === 0 && (
                                        <p className="text-xs text-gray-400 col-span-2">All permissions already granted by role</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                            <button className="btn btn-outline-danger" onClick={() => setShowUserModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleUserRoleUpdate}>
                                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Update Role
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserAccess;
