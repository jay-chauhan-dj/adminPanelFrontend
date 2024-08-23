import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { getRequest, postRequest } from '../../utils/Request';

const Validation = () => {
    const headers = {
        "Content-Type": "application/json",
        "authorization": "Bearer " + localStorage.getItem('accessToken')
    };
    const [banks, setBanks] = useState([]);
    const [users, setUsers] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        const getBanks = async () => {
            const response = await getRequest("/v1/money/getBanks", {}, headers);
            setBanks(response);
        }
        const getUsers = async () => {
            const response = await getRequest("/v1/money/getUsers", {}, headers);
            setUsers(response);
        }
        getBanks();
        getUsers();
        dispatch(setPageTitle('Money'));
    }, [dispatch]);

    const getPaymentMethods = async (bankId: any) => {
        const response = await getRequest(`/v1/money/getPaymentMethods`, { bankId: bankId }, headers);
        setPaymentMethods(response);
    }

    const submitForm = async (formData: any, resetForm: any) => {
        const response = await postRequest("/v1/money/saveTransection", formData, {}, headers);
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
        });
        if (response.success) {
            toast.fire({
                icon: 'success',
                title: response.message,
                padding: '10px 20px',
            });
            resetForm(); // Reset the form
        } else {
            toast.fire({
                icon: 'error',
                title: response.message,
                padding: '10px 20px',
            });
        }
    };

    const formValidator = Yup.object().shape({
        title: Yup.string().required('Please Enter the title'),
        amount: Yup.string().required('Please Enter the amount'),
        userId: Yup.string().required('Please Select the user'),
        bank: Yup.string().required('Please Select the bank'),
        method: Yup.string().required('Please Select the method')
    });

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Forms
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Money Manage</span>
                </li>
            </ul>

            <div className="pt-5 space-y-8">

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Custom Styles */}
                    <div className="panel" id="custom_styles">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Add Transactions</h5>
                        </div>
                        <div className="mb-5">
                            <Formik
                                initialValues={{
                                    title: '',
                                    amount: '',
                                    userId: '',
                                    bank: '',
                                    method: '',
                                    agree: false,
                                }}
                                validationSchema={formValidator}
                                onSubmit={(values, { resetForm }) => {
                                    submitForm(values, resetForm);
                                }}
                            >
                                {({ errors, submitCount, touched, values, setFieldValue }) => (
                                    <Form className="space-y-5" >
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                            <div className={submitCount ? (errors.title ? 'has-error' : 'has-success') : ''}>
                                                <label htmlFor="title">Transaction Title</label>
                                                <Field name="title" type="text" id="title" placeholder="Enter Transaction Title" className="form-input" />
                                                {submitCount && errors.title ? (
                                                    <div className="text-danger mt-1">{errors.title}</div>
                                                ) : (
                                                    submitCount ? <div className="text-success mt-1">Looks Good!</div> : ""
                                                )}
                                            </div>

                                            <div className={submitCount ? (errors.amount ? 'has-error' : 'has-success') : ''}>
                                                <label htmlFor="amount">Transaction Amount</label>
                                                <Field name="amount" type="text" id="amount" placeholder="Enter Transaction Amount" className="form-input" />
                                                {submitCount && errors.amount ? (
                                                    <div className="text-danger mt-1">{errors.amount}</div>
                                                ) : (
                                                    submitCount ? <div className="text-success mt-1">Looks Good!</div> : ""
                                                )}
                                            </div>

                                            <div className={submitCount ? (errors.userId ? 'has-error' : 'has-success') : ''}>
                                                <label htmlFor="userId">Username</label>
                                                <Field as="select" name="userId" className="form-select">
                                                    <option value="" disabled>Select User</option>
                                                    {users.map(user => (
                                                        <option key={user.userId} value={user.userId}>
                                                            {user.userFirstName + " " + user.userLastName}
                                                        </option>
                                                    ))}
                                                </Field>
                                                {submitCount && errors.userId ? (
                                                    <div className="text-danger mt-1">{errors.userId}</div>
                                                ) : (
                                                    submitCount ? <div className="text-success mt-1">Looks Good!</div> : ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className={submitCount ? (errors.bank ? 'has-error' : 'has-success') : ''}>
                                                <Field
                                                    as="select"
                                                    name="bank"
                                                    className="form-select"
                                                    value={values.bank}
                                                    onChange={(e) => {
                                                        setFieldValue("bank", e.target.value);
                                                        getPaymentMethods(e.target.value);
                                                    }}
                                                >
                                                    <option value="" disabled>Select Bank</option>
                                                    {banks.map(bank => (
                                                        <option key={bank.bankId} value={bank.bankId}>
                                                            {bank.bankName}
                                                        </option>
                                                    ))}
                                                </Field>
                                                {submitCount && errors.bank ? (
                                                    <div className="text-danger mt-1">{errors.bank}</div>
                                                ) : (
                                                    submitCount ? <div className="text-success mt-1">Looks Good!</div> : ""
                                                )}
                                            </div>
                                            <div className={submitCount ? (errors.method ? 'has-error' : 'has-success') : ''}>
                                                <Field as="select" name="method" className="form-select" value={values.method}>
                                                    <option value="" disabled>Select Payment Method</option>
                                                    {paymentMethods.map(method => (
                                                        <option key={method.paymentMethodId} value={method.paymentMethodId}>
                                                            {method.paymentMethodName}
                                                        </option>
                                                    ))}
                                                </Field>
                                                {submitCount && errors.method ? (
                                                    <div className="text-danger mt-1">{errors.method}</div>
                                                ) : (
                                                    submitCount ? <div className="text-success mt-1">Looks Good!</div> : ""
                                                )}
                                            </div>
                                        </div>

                                        <div className={submitCount ? (errors.agree ? 'has-error' : 'has-success') : ''}>
                                            <div className="flex">
                                                <Field name="agree" id="agree" type="checkbox" className="form-checkbox" />
                                                <label htmlFor="agree" className="text-white-dark font-semibold ml-2">
                                                    Income Transaction
                                                </label>
                                            </div>
                                            {submitCount && errors.agree ? <div className="text-danger mt-1">{errors.agree}</div> : ''}
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary !mt-6"
                                        >
                                            Submit Form
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Validation;
