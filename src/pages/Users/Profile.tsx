import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from '../../config';

const Profile = () => {
    const dispatch = useDispatch();
    const [profileData, setProfileData] = useState<any>(null);
    const [socialLinks, setSocialLinks] = useState<any>({});
    const [leaveSummary, setLeaveSummary] = useState<any[]>([]);
    const [attendance, setAttendance] = useState<any[]>([]);
    const [bankDetails, setBankDetails] = useState<any[]>([]);
    const [salaryHistory, setSalaryHistory] = useState<any[]>([]);
    const [showAddBankModal, setShowAddBankModal] = useState(false);
    const [showSalaryModal, setShowSalaryModal] = useState(false);
    const [selectedSalary, setSelectedSalary] = useState<any>(null);
    const [bankForm, setBankForm] = useState({ bankAccountNumber: '', bankIfscCode: '', bankName: '', bankBranchAddress: '' });
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        dispatch(setPageTitle('Profile'));
        fetchProfileData();
        fetchSocialLinks();
        fetchLeaveSummary();
        fetchAttendance();
        fetchBankDetails();
        fetchSalaryHistory();
    }, []);
    
    const fetchProfileData = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }
            const response = await axios.get(`${config.API_BASE_URL}v1/userAccess/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Profile Data:', response.data.user);
            if (response.data.user.userAddress) {
                console.log('Address Data:', typeof response.data.user.userAddress === 'string' ? JSON.parse(response.data.user.userAddress) : response.data.user.userAddress);
            }
            setProfileData(response.data.user);
        } catch (error: any) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSocialLinks = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) return;
            const response = await axios.get(`${config.API_BASE_URL}v1/social/my-links`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSocialLinks(response.data.socialLinks || {});
        } catch (error: any) {
            console.error('Error fetching social links:', error);
        }
    };

    const fetchLeaveSummary = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) return;
            const response = await axios.get(`${config.API_BASE_URL}v1/userAccess/leave-summary`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLeaveSummary(response.data.data || []);
        } catch (error: any) {
            console.error('Error fetching leave summary:', error);
        }
    };

    const fetchAttendance = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) return;
            const response = await axios.get(`${config.API_BASE_URL}v1/userAccess/attendance-last-7-days`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAttendance(response.data.attendance || []);
        } catch (error: any) {
            console.error('Error fetching attendance:', error);
        }
    };

    const calculateHours = (clockIn: string, clockOut: string) => {
        if (!clockIn || !clockOut) return 'N/A';
        const start = new Date(clockIn);
        const end = new Date(clockOut);
        const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        return hours.toFixed(2) + 'h';
    };

    const formatTime = (time: string) => {
        if (!time) return 'N/A';
        return new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const fetchBankDetails = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) return;
            const response = await axios.get(`${config.API_BASE_URL}v1/userAccess/user-bank-details`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBankDetails(response.data.bankDetails || []);
        } catch (error: any) {
            console.error('Error fetching bank details:', error);
        }
    };

    const handleDeleteBank = async (bankId: number) => {
        if (!confirm('Are you sure you want to delete this bank account?')) return;
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) return;
            await axios.delete(`${config.API_BASE_URL}v1/userAccess/user-bank-details/${bankId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchBankDetails();
        } catch (error: any) {
            console.error('Error deleting bank details:', error);
        }
    };

    const handleAddBank = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) return;
            await axios.post(`${config.API_BASE_URL}v1/userAccess/user-bank-details`, bankForm, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBankForm({ bankAccountNumber: '', bankIfscCode: '', bankName: '', bankBranchAddress: '' });
            setShowAddBankModal(false);
            fetchBankDetails();
        } catch (error: any) {
            console.error('Error adding bank details:', error);
            alert('Failed to add bank details');
        }
    };

    const fetchSalaryHistory = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) return;
            const response = await axios.get(`${config.API_BASE_URL}v1/userAccess/salary-history?limit=1`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSalaryHistory(response.data.salaries || []);
        } catch (error: any) {
            console.error('Error fetching salary history:', error);
        }
    };

    const formatMonth = (month: string) => {
        const [year, monthNum] = month.split('-');
        const date = new Date(parseInt(year), parseInt(monthNum) - 1);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    const getStatusBadge = (status: string) => {
        const badges: any = {
            paid: 'badge bg-success',
            pending: 'badge bg-warning',
            processing: 'badge bg-info',
            failed: 'badge bg-danger'
        };
        return badges[status] || 'badge bg-secondary';
    };
    
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Users
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Profile</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Profile</h5>
                            <Link to="/users/user-account-settings" className="ltr:ml-auto rtl:mr-auto btn btn-primary p-2 rounded-full">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                    <path opacity="0.5" d="M4 22H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path
                                        d="M14.6296 2.92142L13.8881 3.66293L7.07106 10.4799C6.60933 10.9416 6.37846 11.1725 6.17992 11.4271C5.94571 11.7273 5.74491 12.0522 5.58107 12.396C5.44219 12.6874 5.33894 12.9972 5.13245 13.6167L4.25745 16.2417L4.04356 16.8833C3.94194 17.1882 4.02128 17.5243 4.2485 17.7515C4.47573 17.9787 4.81182 18.0581 5.11667 17.9564L5.75834 17.7426L8.38334 16.8675L8.3834 16.8675C9.00284 16.6611 9.31256 16.5578 9.60398 16.4189C9.94775 16.2551 10.2727 16.0543 10.5729 15.8201C10.8275 15.6215 11.0583 15.3907 11.5201 14.929L11.5201 14.9289L18.3371 8.11195L19.0786 7.37044C20.3071 6.14188 20.3071 4.14999 19.0786 2.92142C17.85 1.69286 15.8581 1.69286 14.6296 2.92142Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path
                                        opacity="0.5"
                                        d="M13.8879 3.66406C13.8879 3.66406 13.9806 5.23976 15.3709 6.63008C16.7613 8.0204 18.337 8.11308 18.337 8.11308M5.75821 17.7437L4.25732 16.2428"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </Link>
                        </div>
                        <div className="mb-5">
                            <div className="flex flex-col justify-center items-center">
                                {profileData ? (
                                    <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold mb-5">
                                        {profileData.userFirstName?.charAt(0).toUpperCase()}{profileData.userLastName?.charAt(0).toUpperCase()}
                                    </div>
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-gray-300 animate-pulse mb-5"></div>
                                )}
                                <p className="font-semibold text-primary text-xl">{profileData ? `${profileData.userFirstName} ${profileData.userLastName}` : 'Loading...'}</p>
                            </div>
                            <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                                <li className="flex items-center gap-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0">
                                        <path
                                            d="M2.3153 12.6978C2.26536 12.2706 2.2404 12.057 2.2509 11.8809C2.30599 10.9577 2.98677 10.1928 3.89725 10.0309C4.07094 10 4.286 10 4.71612 10H15.2838C15.7139 10 15.929 10 16.1027 10.0309C17.0132 10.1928 17.694 10.9577 17.749 11.8809C17.7595 12.057 17.7346 12.2706 17.6846 12.6978L17.284 16.1258C17.1031 17.6729 16.2764 19.0714 15.0081 19.9757C14.0736 20.6419 12.9546 21 11.8069 21H8.19303C7.04537 21 5.9263 20.6419 4.99182 19.9757C3.72352 19.0714 2.89681 17.6729 2.71598 16.1258L2.3153 12.6978Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path opacity="0.5" d="M17 17H19C20.6569 17 22 15.6569 22 14C22 12.3431 20.6569 11 19 11H17.5" stroke="currentColor" strokeWidth="1.5" />
                                        <path
                                            opacity="0.5"
                                            d="M10.0002 2C9.44787 2.55228 9.44787 3.44772 10.0002 4C10.5524 4.55228 10.5524 5.44772 10.0002 6"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M4.99994 7.5L5.11605 7.38388C5.62322 6.87671 5.68028 6.0738 5.24994 5.5C4.81959 4.9262 4.87665 4.12329 5.38382 3.61612L5.49994 3.5"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M14.4999 7.5L14.6161 7.38388C15.1232 6.87671 15.1803 6.0738 14.7499 5.5C14.3196 4.9262 14.3767 4.12329 14.8838 3.61612L14.9999 3.5"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    {profileData?.userRole || 'N/A'}
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0">
                                        <path
                                            d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path opacity="0.5" d="M7 4V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path opacity="0.5" d="M17 4V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path opacity="0.5" d="M2 9H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    {profileData?.userCreatedDate ? new Date(profileData.userCreatedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                                </li>
                                <li>
                                    <button className="flex items-center gap-2">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                            <path
                                                opacity="0.5"
                                                d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <span className="text-primary truncate">{profileData?.userEmail || 'N/A'}</span>
                                    </button>
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M5.00659 6.93309C5.04956 5.7996 5.70084 4.77423 6.53785 3.93723C7.9308 2.54428 10.1532 2.73144 11.0376 4.31617L11.6866 5.4791C12.2723 6.52858 12.0372 7.90533 11.1147 8.8278M17.067 18.9934C18.2004 18.9505 19.2258 18.2992 20.0628 17.4622C21.4558 16.0692 21.2686 13.8468 19.6839 12.9624L18.5209 12.3134C17.4715 11.7277 16.0947 11.9628 15.1722 12.8853"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            opacity="0.5"
                                            d="M5.00655 6.93311C4.93421 8.84124 5.41713 12.0817 8.6677 15.3323C11.9183 18.5829 15.1588 19.0658 17.0669 18.9935M15.1722 12.8853C15.1722 12.8853 14.0532 14.0042 12.0245 11.9755C9.99578 9.94676 11.1147 8.82782 11.1147 8.82782"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                    </svg>
                                    <span className="whitespace-nowrap" dir="ltr">
                                        {profileData?.userPhoneNumber || 'N/A'}
                                    </span>
                                </li>
                            </ul>
                            <ul className="mt-7 flex items-center justify-center gap-3">
                                <li>
                                    {socialLinks.twitter ? (
                                        <a href={`https://twitter.com/${socialLinks.twitter}`} target="_blank" rel="noopener noreferrer" className="btn btn-info flex items-center justify-center rounded-full w-10 h-10 p-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                            </svg>
                                        </a>
                                    ) : (
                                        <button disabled className="btn btn-info flex items-center justify-center rounded-full w-10 h-10 p-0 opacity-50 cursor-not-allowed">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                            </svg>
                                        </button>
                                    )}
                                </li>
                                <li>
                                    {socialLinks.linkedin ? (
                                        <a href={`https://linkedin.com/in/${socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary flex items-center justify-center rounded-full w-10 h-10 p-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                                <rect x="2" y="9" width="4" height="12"></rect>
                                                <circle cx="4" cy="4" r="2"></circle>
                                            </svg>
                                        </a>
                                    ) : (
                                        <button disabled className="btn btn-primary flex items-center justify-center rounded-full w-10 h-10 p-0 opacity-50 cursor-not-allowed">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                                <rect x="2" y="9" width="4" height="12"></rect>
                                                <circle cx="4" cy="4" r="2"></circle>
                                            </svg>
                                        </button>
                                    )}
                                </li>
                                <li>
                                    {socialLinks.github ? (
                                        <a href={`https://github.com/${socialLinks.github}`} target="_blank" rel="noopener noreferrer" className="btn btn-dark flex items-center justify-center rounded-full w-10 h-10 p-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                            </svg>
                                        </a>
                                    ) : (
                                        <button disabled className="btn btn-dark flex items-center justify-center rounded-full w-10 h-10 p-0 opacity-50 cursor-not-allowed">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                            </svg>
                                        </button>
                                    )}
                                </li>
                                <li>
                                    {socialLinks.facebook ? (
                                        <a href={`https://facebook.com/${socialLinks.facebook}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary flex items-center justify-center rounded-full w-10 h-10 p-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                            </svg>
                                        </a>
                                    ) : (
                                        <button disabled className="btn btn-primary flex items-center justify-center rounded-full w-10 h-10 p-0 opacity-50 cursor-not-allowed">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                            </svg>
                                        </button>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="panel lg:col-span-2 xl:col-span-3">
                        <div className="mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Attendance (Last 7 Days)</h5>
                        </div>
                        <div className="mb-5">
                            <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                <table className="whitespace-nowrap">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Check In</th>
                                            <th>Check Out</th>
                                            <th>Total Hours</th>
                                        </tr>
                                    </thead>
                                    <tbody className="dark:text-white-dark">
                                        {attendance.length > 0 ? (
                                            attendance.map((record: any, index: number) => (
                                                <tr key={index}>
                                                    <td>{new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                                    <td>{formatTime(record.clockIn)}</td>
                                                    <td>{formatTime(record.clockOut)}</td>
                                                    <td>{calculateHours(record.clockIn, record.clockOut)}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="text-center">No attendance data available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="panel">
                        <div className="mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Address</h5>
                        </div>
                        <div>
                            {profileData?.userAddress ? (() => {
                                try {
                                    const address = typeof profileData.userAddress === 'string' ? JSON.parse(profileData.userAddress) : profileData.userAddress;
                                    console.log('Address object:', address);
                                    return (
                                        <div className="space-y-3">
                                            <p className="text-[#515365] dark:text-white-light">
                                                <span className="text-white-dark">Address Line 1 : </span>
                                                <span className="font-semibold">{address['address-1'] || 'N/A'}</span>
                                            </p>
                                            <p className="text-[#515365] dark:text-white-light">
                                                <span className="text-white-dark">Address Line 2 : </span>
                                                <span className="font-semibold">{address['address-2'] || 'N/A'}</span>
                                            </p>
                                            <p className="text-[#515365] dark:text-white-light">
                                                <span className="text-white-dark">Landmark : </span>
                                                <span className="font-semibold">{address.landmark || 'N/A'}</span>
                                            </p>
                                            <p className="text-[#515365] dark:text-white-light">
                                                <span className="text-white-dark">City : </span>
                                                <span className="font-semibold">{address.city || 'N/A'}</span>
                                            </p>
                                            <p className="text-[#515365] dark:text-white-light">
                                                <span className="text-white-dark">State : </span>
                                                <span className="font-semibold">{address.state || 'N/A'}</span>
                                            </p>
                                            <p className="text-[#515365] dark:text-white-light">
                                                <span className="text-white-dark">Country : </span>
                                                <span className="font-semibold">{address.country || 'N/A'}</span>
                                            </p>
                                            <p className="text-[#515365] dark:text-white-light">
                                                <span className="text-white-dark">Postal Code : </span>
                                                <span className="font-semibold">{address['postal-code'] || 'N/A'}</span>
                                            </p>
                                        </div>
                                    );
                                } catch (e) {
                                    return <p className="text-white-dark">No address available</p>;
                                }
                            })() : <p className="text-white-dark">No address available</p>}
                        </div>
                    </div>
                    <div className="panel">
                        <div className="mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Leave Info</h5>
                        </div>
                        <div>
                            {leaveSummary.length > 0 ? (
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-white-dark">
                                            <th className="text-left font-semibold pb-3">Leave Type</th>
                                            <th className="text-center font-semibold pb-3">Allocated</th>
                                            <th className="text-center font-semibold pb-3">Used</th>
                                            <th className="text-center font-semibold pb-3">Left</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaveSummary.map((leave: any, index: number) => (
                                            <tr key={index}>
                                                <td className="py-2 text-[#515365] dark:text-white-light font-semibold">{leave.leaveTypeName}</td>
                                                <td className="py-2 text-center text-primary font-bold text-lg">{leave.allocated}</td>
                                                <td className="py-2 text-center text-danger font-bold text-lg">{leave.used}</td>
                                                <td className="py-2 text-center text-success font-bold text-lg">{leave.left}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-white-dark">No leave data available</p>
                            )}
                        </div>
                    </div>
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Salary History</h5>
                            <Link to="/users/salary-history" className="text-primary hover:underline text-sm font-semibold">
                                View All →
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {salaryHistory.length > 0 ? (
                                salaryHistory.map((salary: any) => (
                                    <div key={salary.salaryId} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h6 className="text-[#515365] dark:text-white-light font-semibold">{formatMonth(salary.salaryMonth)}</h6>
                                                <p className="text-xs text-white-dark mt-1">Paid on: {salary.salaryPaymentDate ? new Date(salary.salaryPaymentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}</p>
                                            </div>
                                            <span className={getStatusBadge(salary.salaryStatus)}>{salary.salaryStatus.toUpperCase()}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 mb-3">
                                            <div>
                                                <p className="text-xs text-white-dark">Gross Salary</p>
                                                <p className="text-sm font-semibold text-[#515365] dark:text-white-light">₹{parseFloat(salary.salaryGrossAmount).toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-white-dark">Deductions</p>
                                                <p className="text-sm font-semibold text-danger">-₹{parseFloat(salary.salaryTotalDeductions).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="border-t border-[#ebedf2] dark:border-[#1b2e4b] pt-3 flex justify-between items-center">
                                            <div>
                                                <p className="text-xs text-white-dark">Net Salary</p>
                                                <p className="text-lg font-bold text-success">₹{parseFloat(salary.salaryNetAmount).toLocaleString()}</p>
                                            </div>
                                            <button onClick={() => { setSelectedSalary(salary); setShowSalaryModal(true); }} className="btn btn-outline-primary btn-sm">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-white-dark text-center py-4">No salary history available</p>
                            )}
                        </div>
                    </div>
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Bank Details</h5>
                            <button onClick={() => setShowAddBankModal(true)} className="btn btn-primary btn-sm">
                                Add Bank
                            </button>
                        </div>
                        <div className="space-y-3">
                            {bankDetails.length > 0 ? (
                                bankDetails.map((bank: any) => (
                                    <div key={bank.bankId} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 relative">
                                        <button 
                                            onClick={() => handleDeleteBank(bank.bankId)}
                                            className="absolute top-3 right-3 text-danger hover:text-red-700"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20.5001 6H3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                <path d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                <path opacity="0.5" d="M9.5 11L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                <path opacity="0.5" d="M14.5 11L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                            </svg>
                                        </button>
                                        <div className="pr-8">
                                            <h6 className="text-[#515365] dark:text-white-light font-semibold text-base mb-3">{bank.bankName}</h6>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <p className="text-xs text-white-dark mb-1">Account Number</p>
                                                    <p className="text-sm font-semibold text-[#515365] dark:text-white-light">{bank.bankAccountNumber}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-white-dark mb-1">IFSC Code</p>
                                                    <p className="text-sm font-semibold text-[#515365] dark:text-white-light">{bank.bankIfscCode}</p>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <p className="text-xs text-white-dark mb-1">Branch Address</p>
                                                <p className="text-sm text-[#515365] dark:text-white-light">{bank.bankBranchAddress}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-white-dark text-center py-4">No bank details available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showAddBankModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="panel w-full max-w-lg">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Add Bank Details</h5>
                            <button onClick={() => setShowAddBankModal(false)} className="text-white-dark hover:text-dark">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleAddBank}>
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="bankName" className="text-white-dark">Bank Name</label>
                                    <input
                                        id="bankName"
                                        type="text"
                                        value={bankForm.bankName}
                                        onChange={(e) => setBankForm({...bankForm, bankName: e.target.value})}
                                        className="form-input mt-1"
                                        placeholder="Enter bank name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="accountNumber" className="text-white-dark">Account Number</label>
                                    <input
                                        id="accountNumber"
                                        type="text"
                                        value={bankForm.bankAccountNumber}
                                        onChange={(e) => setBankForm({...bankForm, bankAccountNumber: e.target.value})}
                                        className="form-input mt-1"
                                        placeholder="Enter account number"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="ifscCode" className="text-white-dark">IFSC Code</label>
                                    <input
                                        id="ifscCode"
                                        type="text"
                                        value={bankForm.bankIfscCode}
                                        onChange={(e) => setBankForm({...bankForm, bankIfscCode: e.target.value})}
                                        className="form-input mt-1"
                                        placeholder="Enter IFSC code"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="branchAddress" className="text-white-dark">Branch Address</label>
                                    <textarea
                                        id="branchAddress"
                                        value={bankForm.bankBranchAddress}
                                        onChange={(e) => setBankForm({...bankForm, bankBranchAddress: e.target.value})}
                                        className="form-textarea mt-1"
                                        rows={3}
                                        placeholder="Enter branch address"
                                        required
                                    />
                                </div>
                                <div className="flex gap-3 justify-end mt-8">
                                    <button type="button" onClick={() => setShowAddBankModal(false)} className="btn btn-outline-danger">
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Add Bank Account
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showSalaryModal && selectedSalary && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="panel w-full max-w-lg">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Salary Details - {formatMonth(selectedSalary.salaryMonth)}</h5>
                            <button onClick={() => setShowSalaryModal(false)} className="text-white-dark hover:text-dark">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="space-y-5">
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                                <h6 className="font-semibold text-[#515365] dark:text-white-light mb-3">Earnings</h6>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-white-dark">Basic Salary</span>
                                        <span className="font-semibold">₹{parseFloat(selectedSalary.salaryBasic || 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white-dark">HRA</span>
                                        <span className="font-semibold">₹{parseFloat(selectedSalary.salaryHRA || 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white-dark">Allowances</span>
                                        <span className="font-semibold">₹{parseFloat(selectedSalary.salaryAllowances || 0).toLocaleString()}</span>
                                    </div>
                                    {parseFloat(selectedSalary.salaryBonus || 0) > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-white-dark">Bonus</span>
                                            <span className="font-semibold">₹{parseFloat(selectedSalary.salaryBonus).toLocaleString()}</span>
                                        </div>
                                    )}
                                    {parseFloat(selectedSalary.salaryIncentives || 0) > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-white-dark">Incentives</span>
                                            <span className="font-semibold">₹{parseFloat(selectedSalary.salaryIncentives).toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between border-t border-[#ebedf2] dark:border-[#1b2e4b] pt-2 mt-2">
                                        <span className="font-semibold">Total Earnings</span>
                                        <span className="font-bold text-success">₹{parseFloat(selectedSalary.salaryGrossAmount).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                                <h6 className="font-semibold text-[#515365] dark:text-white-light mb-3">Deductions</h6>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-white-dark">PF</span>
                                        <span className="font-semibold text-danger">₹{parseFloat(selectedSalary.salaryPF || 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white-dark">Tax (TDS)</span>
                                        <span className="font-semibold text-danger">₹{parseFloat(selectedSalary.salaryTax || 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white-dark">Professional Tax</span>
                                        <span className="font-semibold text-danger">₹{parseFloat(selectedSalary.salaryProfessionalTax || 0).toLocaleString()}</span>
                                    </div>
                                    {parseFloat(selectedSalary.salaryOtherDeductions || 0) > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-white-dark">Other Deductions</span>
                                            <span className="font-semibold text-danger">₹{parseFloat(selectedSalary.salaryOtherDeductions).toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between border-t border-[#ebedf2] dark:border-[#1b2e4b] pt-2 mt-2">
                                        <span className="font-semibold">Total Deductions</span>
                                        <span className="font-bold text-danger">₹{parseFloat(selectedSalary.salaryTotalDeductions).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-primary/10 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-[#515365] dark:text-white-light">Net Payable</span>
                                    <span className="text-2xl font-bold text-primary">₹{parseFloat(selectedSalary.salaryNetAmount).toLocaleString()}</span>
                                </div>
                                <div className="mt-3 text-sm text-white-dark">
                                    <p>Payment Date: {selectedSalary.salaryPaymentDate ? new Date(selectedSalary.salaryPaymentDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A'}</p>
                                    <p>Payment Method: {selectedSalary.salaryPaymentMethod?.replace('_', ' ').toUpperCase()}</p>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button 
                                    onClick={async () => {
                                        const token = localStorage.getItem('accessToken');
                                        const response = await fetch(`${config.API_BASE_URL}v1/userAccess/salary-slip/${selectedSalary.salaryId}`, {
                                            headers: { Authorization: `Bearer ${token}` }
                                        });
                                        const blob = await response.blob();
                                        const url = window.URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = `salary_slip_${formatMonth(selectedSalary.salaryMonth).replace(' ', '_')}.pdf`;
                                        a.click();
                                    }} 
                                    className="btn btn-success"
                                >
                                    Download PDF
                                </button>
                                <button onClick={() => setShowSalaryModal(false)} className="btn btn-primary">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
