import { Link } from 'react-router-dom';
import { useEffect, useState, Fragment } from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { getRequest, postRequest } from '../../utils/Request';
import { Dialog, Transition } from '@headlessui/react';
import MaskedInput from 'react-text-mask';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';

const Validation = () => {
    const headers = {
        "Content-Type": "application/json",
        "authorization": "Bearer " + localStorage.getItem('accessToken')
    };
    const [banks, setBanks] = useState([]);
    const [users, setUsers] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [verifyModal, setVerify] = useState(false);
    const [registerModal, setRegister] = useState(false);
    const [qrSrc, setQrSrc] = useState("");
    const [userVerified, setVerification] = useState(false);
    const [contacts, setContacts] = useState([{
        value: '',
        label: ''
    }]);
    const [paymentTypes, setPaymentTypes] = useState([{
        value: '',
        label: ''
    }]);

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

    const saveTransection = async (formData: any, resetForm: any) => {
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

    const createPaymentLink = async (formData: any, resetForm: any) => {
        const response = await postRequest("/v1/payment/payment-link/create", formData, {}, headers);
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
        });
        if (response.success) {
            console.log(response);

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

    const getContacts = async () => {
        const response = await getRequest("/v1/contact/get", {}, headers);
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
        });
        if (response.success) {
            let options = response.contacts.map((contact: { id: any; firstName: any; lastName: any; }) => ({
                value: contact.id,
                label: `${contact.firstName} ${contact.lastName}`.trim()
            }));

            setContacts(options);
        } else {
            toast.fire({
                icon: 'error',
                title: response.message,
                padding: '10px 20px',
            });
        }
    };

    const getPaymentTypes = async () => {
        const response = await getRequest("/v1/payment/types", {}, headers);
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
        });
        if (response.success) {
            let options = Object.entries(response.data).map(([key, value]) => ({
                value: key,
                label: key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()) + "- Prefix: " + value
            }));

            setPaymentTypes(options);
        } else {
            toast.fire({
                icon: 'error',
                title: response.message,
                padding: '10px 20px',
            });
        }
    };

    const verifyUser = async (formData: any, resetForm: any) => {
        const response = await postRequest("/v1/2fa/verify", formData, {}, headers);
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
            setVerify(false);
            getContacts();
            getPaymentTypes();
            setVerification(true);
        } else {
            toast.fire({
                icon: 'error',
                title: response.message,
                padding: '10px 20px',
            });
        }
    };

    const register2faUser = async () => {
        const response = await postRequest("/v1/2fa/create", {}, {}, headers);
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
        });
        if (response.success) {
            setQrSrc(response.qrUrl)
            setRegister(true);
        } else {
            toast.fire({
                icon: 'error',
                title: response.message,
                padding: '10px 20px',
            });
        }
    }

    const formValidator = Yup.object().shape({
        title: Yup.string().required('Please Enter the title'),
        amount: Yup.string().required('Please Enter the amount'),
        userId: Yup.string().required('Please Select the user'),
        bank: Yup.string().required('Please Select the bank'),
        method: Yup.string().required('Please Select the method')
    });

    const linkFormValidator = Yup.object().shape({
        linkPurpose: Yup.string().required('Please Enter the title'),
        linkExpiryTime: Yup.string().required('Please Enter the time'),
        contactId: Yup.string().required('Please Select the person'),
        linkType: Yup.string().required('Please Select the linkType'),
        amount: Yup.string().required('Please Select the amount')
    });

    const userValidator = Yup.object().shape({
        code: Yup.number().min(6).required('Please Enter the code'),
    });

    const MaskedInputField = ({ field, form, mask, ...props }) => (
        <MaskedInput
            {...field}
            {...props}
            mask={mask}
            onChange={(e) => form.setFieldValue(field.name, e.target.value)}
        />
    );

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
                <div className="grid grid-cols-2 xl:grid-cols-2 gap-6">
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
                                    saveTransection(values, resetForm);
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
                    <div className="panel" id="custom_styles">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Create Payment Link</h5>
                        </div>

                        {
                            (!userVerified) ? (
                                <div className="md-5">
                                    <div className="flex items-center justify-center">
                                        {/* <button type="button" onClick={() => register2faUser()} className="btn btn-primary">
                                            Register For 2FA
                                        </button> */}
                                        <button type="button" onClick={() => setVerify(true)} className="btn btn-success ltr:ml-4 rtl:mr-4">
                                            Verify Your Self
                                        </button>
                                    </div>
                                    <Transition appear show={verifyModal} as={Fragment}>
                                        <Dialog as="div" open={verifyModal} onClose={() => setVerify(false)}>
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0"
                                                enterTo="opacity-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <div className="fixed inset-0" />
                                            </Transition.Child>
                                            <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                                                <div className="flex items-center justify-center min-h-screen px-4">
                                                    <Transition.Child
                                                        as={Fragment}
                                                        enter="ease-out duration-300"
                                                        enterFrom="opacity-0 scale-95"
                                                        enterTo="opacity-100 scale-100"
                                                        leave="ease-in duration-200"
                                                        leaveFrom="opacity-100 scale-100"
                                                        leaveTo="opacity-0 scale-95"
                                                    >
                                                        <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                                            <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                                                <h5 className="font-bold text-lg">2Fa Authentication</h5>
                                                                <button type="button" className="text-white-dark hover:text-dark" onClick={() => setVerify(false)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                                </button>
                                                            </div>
                                                            <div className="p-5">
                                                                <Formik
                                                                    initialValues={{
                                                                        code: ''
                                                                    }}
                                                                    validationSchema={userValidator}
                                                                    onSubmit={(values, { resetForm }) => {
                                                                        verifyUser(values, resetForm);
                                                                    }}
                                                                >
                                                                    {({ errors, submitCount, touched, values, setFieldValue }) => (
                                                                        <Form className="space-y-5" >
                                                                            <div className="grid grid-cols-1 md:grid-cols-1">
                                                                                <div className={submitCount ? (errors.code ? 'has-error' : 'has-success') : ''}>
                                                                                    <Field
                                                                                        name="code"
                                                                                        id="code"
                                                                                        value={values.code}
                                                                                        type="text"
                                                                                        placeholder="Enter 2FA Code"
                                                                                        className="form-input"
                                                                                        component={MaskedInputField}
                                                                                        mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                                                                                    />
                                                                                    {submitCount && errors.code ? (
                                                                                        <div className="text-danger mt-1">{errors.code}</div>
                                                                                    ) : (
                                                                                        submitCount ? <div className="text-success mt-1">Looks Good!</div> : ""
                                                                                    )}
                                                                                </div>
                                                                            </div>

                                                                            <div className="flex justify-end items-center mt-8">
                                                                                <button
                                                                                    type="submit"
                                                                                    className="btn btn-primary"
                                                                                >
                                                                                    Verify
                                                                                </button>
                                                                                <button type="button" className="btn btn-outline-danger ltr:ml-4 rtl:mr-4" onClick={() => setVerify(false)}>
                                                                                    Discard
                                                                                </button>
                                                                            </div>
                                                                        </Form>
                                                                    )}
                                                                </Formik>
                                                            </div>
                                                        </Dialog.Panel>
                                                    </Transition.Child>
                                                </div>
                                            </div>
                                        </Dialog>
                                    </Transition>
                                    <Transition appear show={registerModal} as={Fragment}>
                                        <Dialog as="div" open={registerModal} onClose={() => setRegister(false)}>
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0"
                                                enterTo="opacity-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <div className="fixed inset-0" />
                                            </Transition.Child>
                                            <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                                                <div className="flex items-center justify-center min-h-screen px-4">
                                                    <Transition.Child
                                                        as={Fragment}
                                                        enter="ease-out duration-300"
                                                        enterFrom="opacity-0 scale-95"
                                                        enterTo="opacity-100 scale-100"
                                                        leave="ease-in duration-200"
                                                        leaveFrom="opacity-100 scale-100"
                                                        leaveTo="opacity-0 scale-95"
                                                    >
                                                        <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                                            <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                                                <h5 className="font-bold text-lg">2Fa Authentication</h5>
                                                                <button type="button" className="text-white-dark hover:text-dark" onClick={() => setRegister(false)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                                </button>
                                                            </div>
                                                            <div className="p-5">
                                                                <h5 className="text-md">Scan QR In Google Authentocator App</h5><br />
                                                                <center>
                                                                    <img src={qrSrc} />
                                                                </center>
                                                            </div>
                                                        </Dialog.Panel>
                                                    </Transition.Child>
                                                </div>
                                            </div>
                                        </Dialog>
                                    </Transition>
                                </div>
                            ) : (
                                <div className="mb-5">
                                    <Formik
                                        initialValues={{
                                            linkPurpose: '',
                                            linkExpiryTime: '',
                                            contactId: '',
                                            linkType: '',
                                            amount: '',
                                            linkNotify: {
                                                "send_sms": true,
                                                "send_email": true
                                            },
                                        }}
                                        validationSchema={linkFormValidator}
                                        onSubmit={(values, { resetForm }) => {
                                            createPaymentLink(values, resetForm);
                                        }}
                                    >
                                        {({ errors, submitCount, touched, values, setFieldValue }) => (
                                            <Form className="space-y-5" >
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                                    <div className={submitCount ? (errors.linkPurpose ? 'has-error' : 'has-success') : ''}>
                                                        <label htmlFor="linkPurpose">Payment For</label>
                                                        <Field name="linkPurpose" type="text" id="linkPurpose" placeholder="Enter Transaction Title" className="form-input" />
                                                        {submitCount && errors.linkPurpose ? (
                                                            <div className="text-danger mt-1">{errors.linkPurpose}</div>
                                                        ) : (
                                                            submitCount ? <div className="text-success mt-1">Looks Good!</div> : ""
                                                        )}
                                                    </div>

                                                    <div className={submitCount ? (errors.amount ? 'has-error' : 'has-success') : ''}>
                                                        <label htmlFor="amount">Payment Amount</label>
                                                        <Field name="amount" type="text" id="amount" placeholder="Enter Transaction Amount" className="form-input" />
                                                        {submitCount && errors.amount ? (
                                                            <div className="text-danger mt-1">{errors.amount}</div>
                                                        ) : (
                                                            submitCount ? <div className="text-success mt-1">Looks Good!</div> : ""
                                                        )}
                                                    </div>

                                                    <div className={(submitCount ? (errors.contactId ? 'has-error custom-select' : 'has-success custom-select') : 'custom-select')}>
                                                        <label htmlFor="contactId">Person</label>
                                                        <Select
                                                            name="contactId"
                                                            id="contactId"
                                                            placeholder="Select person"
                                                            options={contacts}
                                                            onChange={(selectedOption) => setFieldValue('contactId', selectedOption.value)}
                                                        />
                                                        {submitCount && errors.contactId ? (
                                                            <div className="text-danger mt-1">{errors.contactId}</div>
                                                        ) : (
                                                            submitCount ? <div className="text-success mt-1">Looks Good!</div> : ""
                                                        )}
                                                    </div>

                                                    <div className={(submitCount ? (errors.linkType ? 'has-error custom-select' : 'has-success custom-select') : 'custom-select')}>
                                                        <label htmlFor="linkType">Link Type</label>
                                                        <Select
                                                            name="linkType"
                                                            id="linkType"
                                                            placeholder="Select payment type"
                                                            options={paymentTypes}
                                                            onChange={(selectedOption) => setFieldValue('linkType', selectedOption.value)}
                                                        />
                                                        {submitCount && errors.linkType ? (
                                                            <div className="text-danger mt-1">{errors.linkType}</div>
                                                        ) : (
                                                            submitCount ? <div className="text-success mt-1">Looks Good!</div> : ""
                                                        )}
                                                    </div>

                                                    <div className={(submitCount ? (errors.linkExpiryTime ? 'has-error' : 'has-success') : '') + 'custom-select'}>
                                                        <label htmlFor="linkExpiryTime">Link Expiry</label>
                                                        <Flatpickr
                                                            data-enable-time
                                                            options={{
                                                                enableTime: true,
                                                                dateFormat: 'Y-m-d H:i',
                                                                position: 'auto left',
                                                            }}
                                                            name="linkExpiryTime"
                                                            id="linkExpiryTime"
                                                            className="form-input"
                                                            onChange={(date) => setFieldValue('linkExpiryTime', date[0])}
                                                        />
                                                        {submitCount && errors.linkExpiryTime ? (
                                                            <div className="text-danger mt-1">{errors.linkExpiryTime}</div>
                                                        ) : (
                                                            submitCount ? <div className="text-success mt-1">Looks Good!</div> : ""
                                                        )}
                                                    </div>

                                                    <div className={submitCount ? (errors.linkNotify ? 'has-error' : 'has-success') : ''}>
                                                        <label htmlFor="linkNotify">Send Notificaton</label>
                                                        <div className="flex">
                                                            <Field name="linkNotify.send_sms" id="linkNotify" type="checkbox" className="form-checkbox" />
                                                            <label htmlFor="linkNotify.send_sms" className="text-white-dark font-semibold">
                                                                SMS
                                                            </label>
                                                            <Field name="linkNotify.send_email" id="linkNotify" type="checkbox" className="form-checkbox ml-12" />
                                                            <label htmlFor="linkNotify.send_email" className="text-white-dark font-semibold">
                                                                Email
                                                            </label>
                                                        </div>
                                                        {submitCount && errors.linkNotify ? <div className="text-danger mt-1">{errors.linkNotify}</div> : ''}
                                                    </div>
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
                            )
                        }

                    </div>
                </div>
            </div>
        </div >
    );
};

export default Validation;
