import { Link } from 'react-router-dom';
import { useEffect, useState, Fragment } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { setPageTitle } from '../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { getRequest, postRequest } from '../utils/Request';
import { Dialog, Transition } from '@headlessui/react';
import { Field, Form, Formik } from 'formik';
import MaskedInput from 'react-text-mask';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const headers = {
    "Content-Type": "multipart/form-data",
    "authorization": "Bearer " + localStorage.getItem("accessToken")
};

const Item = ({ name, icon, iconClass }) => {
    return (
        <center>
            <div>
                <div className={iconClass} dangerouslySetInnerHTML={{ __html: icon }}></div>
                <strong>{name || "No Name"}</strong>
            </div>
        </center >
    );
}

const DragAndDrop = () => {
    const [gridDrag, setGridDrag] = useState([]);
    const [history, setHistory] = useState([]);
    const [verifyModal, setVerify] = useState(false);
    const [userVerified, setVerification] = useState(true);
    const [registerModal, setRegister] = useState(false);
    const [qrSrc, setQrSrc] = useState("");
    const dispatch = useDispatch();

    const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
    });

    const getNASTree = async () => {
        const response = await getRequest("/v1/nas/get", {}, headers);
        if (response.success) {
            setGridDrag([response.directoryTree]);
        } else {
            toast.fire({
                icon: 'error',
                title: response.message,
                padding: '10px 20px',
            });
        }
    }

    useEffect(() => {
        getNASTree();
        dispatch(setPageTitle('NAS'));
    }, [dispatch]);

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

    const verifyUser = async (formData: any, resetForm: any) => {
        const response = await postRequest("/v1/2fa/verify", formData, {}, headers);
        if (response.success && response.verify) {
            toast.fire({
                icon: 'success',
                title: response.message,
                padding: '10px 20px',
            });
            resetForm(); // Reset the form
            setVerify(false);
            setVerification(true);
            getNASTree();
        } else {
            toast.fire({
                icon: 'error',
                title: response.message,
                padding: '10px 20px',
            });
        }
    };

    const selectItem = (index) => {
        const selectedItem = gridDrag[index];

        if (selectedItem.type === "folder") {
            setHistory([...history, gridDrag]); // Store the current state before navigating
            setGridDrag(selectedItem.children);
        } else if (selectedItem.type === "back" && history.length > 0) {
            setGridDrag(history[history.length - 1]); // Go back to previous state
            setHistory(history.slice(0, -1)); // Remove last entry from history
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            uploadFiles(files);
        }
    };

    const uploadFiles = async (files: FileList) => {
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
        });
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("file", files[i]); // Adjust "file" to match your API field name
        }

        const response = await postRequest("/v1/nas/uploadFile", formData, {}, headers);
        toast.fire({
            icon: response.type,
            title: response.message,
            padding: '10px 20px',
        });
    };

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
            <ul className="flex space-x-2 rtl:space-x-reverse mb-6">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>NAS - Jay Chauhan</span>
                </li>
            </ul>

            {(!userVerified) ? (
                <div className="md-5">
                    <div className="flex items-center justify-center">
                        <button type="button" onClick={() => register2faUser()} className="btn btn-primary">
                            Register For 2FA
                        </button>
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
                <div className="dragndrop space-y-8">
                    <div className="dragndrop space-y-8">
                        <div className="panel">
                            <div className="font-semibold text-lg dark:text-white mb-5">Primary</div>
                            <div
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                            >
                                <ReactSortable list={gridDrag} setList={setGridDrag} animation={200} className="grid grid-cols-2 xs sm:grid-cols-4 md:grid-cols-8 gap-8 place-items-center">
                                    {gridDrag.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="w-24 h-24 rounded-md shadow dark:border-dark flex items-center justify-center font-semibold cursor-grab"
                                                onClick={() => selectItem(index)}
                                            >
                                                <Item name={item.name} icon={item.iconSvg} iconClass={item.iconColorClass} />
                                            </div>
                                        );
                                    })}
                                </ReactSortable>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    );
};

export default DragAndDrop;
