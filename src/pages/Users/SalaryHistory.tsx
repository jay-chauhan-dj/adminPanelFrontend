import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import { getRequest } from '../../utils/Request';
import { config } from '../../config';
import Logger from '../../utils/Logger';

const SalaryHistory = () => {
    const dispatch = useDispatch();
    const [salaryHistory, setSalaryHistory] = useState<any[]>([]);
    const [showSalaryModal, setShowSalaryModal] = useState(false);
    const [selectedSalary, setSelectedSalary] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        dispatch(setPageTitle('Salary History'));
        fetchSalaryHistory();
    }, []);
    
    const fetchSalaryHistory = async () => {
        try {
            const response = await getRequest('v1/userAccess/salary-history');
            setSalaryHistory(response.salaries || []);
        } catch (error: any) {
            Logger.error('Error fetching salary history:', error);
        } finally {
            setLoading(false);
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

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/users/profile" className="text-primary hover:underline">
                        Profile
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Salary History</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Complete Salary History</h5>
                    </div>
                    {loading ? (
                        <div className="text-center py-10">
                            <span className="animate-spin border-4 border-primary border-l-transparent rounded-full w-10 h-10 inline-block align-middle"></span>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table-hover">
                                <thead>
                                    <tr>
                                        <th>Month</th>
                                        <th>Gross Salary</th>
                                        <th>Deductions</th>
                                        <th>Net Salary</th>
                                        <th>Payment Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {salaryHistory.length > 0 ? (
                                        salaryHistory.map((salary: any) => (
                                            <tr key={salary.salaryId}>
                                                <td>
                                                    <div className="font-semibold">{formatMonth(salary.salaryMonth)}</div>
                                                </td>
                                                <td>
                                                    <div className="font-semibold">₹{parseFloat(salary.salaryGrossAmount).toLocaleString()}</div>
                                                </td>
                                                <td>
                                                    <div className="font-semibold text-danger">₹{parseFloat(salary.salaryTotalDeductions).toLocaleString()}</div>
                                                </td>
                                                <td>
                                                    <div className="font-semibold text-success">₹{parseFloat(salary.salaryNetAmount).toLocaleString()}</div>
                                                </td>
                                                <td>
                                                    {salary.salaryPaymentDate ? new Date(salary.salaryPaymentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                                                </td>
                                                <td>
                                                    <span className={getStatusBadge(salary.salaryStatus)}>{salary.salaryStatus.toUpperCase()}</span>
                                                </td>
                                                <td>
                                                    <div className="flex gap-2">
                                                        <button 
                                                            onClick={() => { setSelectedSalary(salary); setShowSalaryModal(true); }} 
                                                            className="btn btn-outline-primary btn-sm"
                                                        >
                                                            View Details
                                                        </button>
                                                        <button 
                                                            onClick={async () => {
                                                                const token = localStorage.getItem('accessToken');
                                                                const response = await fetch(`${config.API_BASE_URL}v1/userAccess/salary-slip/${salary.salaryId}`, {
                                                                    headers: { Authorization: `Bearer ${token}` }
                                                                });
                                                                const blob = await response.blob();
                                                                const url = window.URL.createObjectURL(blob);
                                                                const a = document.createElement('a');
                                                                a.href = url;
                                                                a.download = `salary_slip_${formatMonth(salary.salaryMonth).replace(' ', '_')}.pdf`;
                                                                a.click();
                                                            }} 
                                                            className="btn btn-outline-success btn-sm"
                                                        >
                                                            Download PDF
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="text-center py-10">
                                                <p className="text-white-dark">No salary history available</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
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
                                        <span className="font-semibold text-danger">
                                            {parseFloat(selectedSalary.salaryPF || 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white-dark">Tax (TDS)</span>
                                        <span className="font-semibold text-danger">{parseFloat(selectedSalary.salaryTax || 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white-dark">Professional Tax</span>
                                        <span className="font-semibold text-danger">{parseFloat(selectedSalary.salaryProfessionalTax || 0).toLocaleString()}</span>
                                    </div>
                                    {parseFloat(selectedSalary.salaryOtherDeductions || 0) > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-white-dark">Other Deductions</span>
                                            <span className="font-semibold text-danger">{parseFloat(selectedSalary.salaryOtherDeductions).toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between border-t border-[#ebedf2] dark:border-[#1b2e4b] pt-2 mt-2">
                                        <span className="font-semibold">Total Deductions</span>
                                        <span className="font-bold text-danger">{parseFloat(selectedSalary.salaryTotalDeductions).toLocaleString()}</span>
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

export default SalaryHistory;
