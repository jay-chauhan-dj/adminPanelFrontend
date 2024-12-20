import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL, toggleSemidark, toggleTheme } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import { IRootState } from '../../store';
import i18next from 'i18next';
import { login, postRequest } from '../../utils/Request';
import { handleTextbox } from '../../utils/Functions';

const LoginCover = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login'));
        dispatch(toggleSemidark(true));
        dispatch(toggleTheme('dark'));
    });
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState(themeConfig.locale);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [otpSending, setOtpSending] = useState(false);
    const [loginKey, setLoginKey] = useState("");
    const [loginInitiated, setLoginInitiated] = useState(false);
    const [otpSent, setOtpSent] = useState();
    const [otp, setOtp] = useState();

    const sendOtp = async () => {
        setOtpSending(true);
        const response = await postRequest("/v1/sendOtp", { username, password });
        setLoginKey(response.loginKey);
        setOtpSent(response.otpSent);
        setOtpSending(false);
    }

    const handleKeyPress = (event: any) => {
        const charCode = event.charCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const submitForm = async (event: any) => {
        event.preventDefault();
        setLoginInitiated(true);
        const loggedIn = await login(username, password, otp, loginKey);
        setLoginInitiated(false);
        if (loggedIn) {
            navigate('/');
        }
    };

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                        <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                            <Link to="/" className="w-48 block lg:w-80 ms-10">
                                <table className='mx-auto'>
                                    <tbody>
                                        <tr>
                                            <td><img src="/favicon.png" alt="Logo" className="mx-auto w-30" /></td>
                                            <td><h1 className="text-3xl font-extrabold uppercase !leading-snug md:text-4xl text-white-light">Admin&nbsp;Panel</h1></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Link>
                            <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                                <img src="/assets/images/auth/login.svg" alt="Cover Image" className="w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                        <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                            <Link to="/" className="w-48 block lg:w-80 ms-10">
                            </Link>
                            <div className="dropdown ms-auto w-max">
                                <Dropdown
                                    offset={[0, 8]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                                    button={
                                        <>
                                            <div>
                                                <img src={`/assets/images/flags/${flag.toUpperCase()}.svg`} alt="image" className="h-5 w-5 rounded-full object-cover" />
                                            </div>
                                            <div className="text-base font-bold uppercase">{flag}</div>
                                            <span className="shrink-0">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M6.99989 9.79988C6.59156 9.79988 6.18322 9.64238 5.87406 9.33321L2.07072 5.52988C1.90156 5.36071 1.90156 5.08071 2.07072 4.91154C2.23989 4.74238 2.51989 4.74238 2.68906 4.91154L6.49239 8.71488C6.77239 8.99488 7.22739 8.99488 7.50739 8.71488L11.3107 4.91154C11.4799 4.74238 11.7599 4.74238 11.9291 4.91154C12.0982 5.08071 12.0982 5.36071 11.9291 5.52988L8.12572 9.33321C7.81656 9.64238 7.40822 9.79988 6.99989 9.79988Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </span>
                                        </>
                                    }
                                >
                                    <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                                        {themeConfig.languageList.map((item: any) => {
                                            return (
                                                <li key={item.code}>
                                                    <button
                                                        type="button"
                                                        className={`flex w-full hover:text-primary rounded-lg ${flag === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                                        onClick={() => {
                                                            i18next.changeLanguage(item.code);
                                                            // setFlag(item.code);
                                                            setLocale(item.code);
                                                        }}
                                                    >
                                                        <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="w-5 h-5 object-cover rounded-full" />
                                                        <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="w-full max-w-[440px] lg:mt-16">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                        <input id="Email" type="text" placeholder="Enter Username" onChange={handleTextbox(setUsername)} className="form-input ps-10 placeholder:text-white-dark" required tabIndex={1} />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <path
                                                    opacity="0.5"
                                                    d="M10.65 2.25H7.35C4.23873 2.25 2.6831 2.25 1.71655 3.23851C0.75 4.22703 0.75 5.81802 0.75 9C0.75 12.182 0.75 13.773 1.71655 14.7615C2.6831 15.75 4.23873 15.75 7.35 15.75H10.65C13.7613 15.75 15.3169 15.75 16.2835 14.7615C17.25 13.773 17.25 12.182 17.25 9C17.25 5.81802 17.25 4.22703 16.2835 3.23851C15.3169 2.25 13.7613 2.25 10.65 2.25Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M14.3465 6.02574C14.609 5.80698 14.6445 5.41681 14.4257 5.15429C14.207 4.89177 13.8168 4.8563 13.5543 5.07507L11.7732 6.55931C11.0035 7.20072 10.4691 7.6446 10.018 7.93476C9.58125 8.21564 9.28509 8.30993 9.00041 8.30993C8.71572 8.30993 8.41956 8.21564 7.98284 7.93476C7.53168 7.6446 6.9973 7.20072 6.22761 6.55931L4.44652 5.07507C4.184 4.8563 3.79384 4.89177 3.57507 5.15429C3.3563 5.41681 3.39177 5.80698 3.65429 6.02574L5.4664 7.53583C6.19764 8.14522 6.79033 8.63914 7.31343 8.97558C7.85834 9.32604 8.38902 9.54743 9.00041 9.54743C9.6118 9.54743 10.1425 9.32604 10.6874 8.97558C11.2105 8.63914 11.8032 8.14522 12.5344 7.53582L14.3465 6.02574Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                        <input id="Password" type={showPassword ? "text" : "password"} placeholder="Enter Password" onChange={handleTextbox(setPassword)} className="form-input ps-10 placeholder:text-white-dark" required tabIndex={2} />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <path
                                                    opacity="0.5"
                                                    d="M1.5 12C1.5 9.87868 1.5 8.81802 2.15901 8.15901C2.81802 7.5 3.87868 7.5 6 7.5H12C14.1213 7.5 15.182 7.5 15.841 8.15901C16.5 8.81802 16.5 9.87868 16.5 12C16.5 14.1213 16.5 15.182 15.841 15.841C15.182 16.5 14.1213 16.5 12 16.5H6C3.87868 16.5 2.81802 16.5 2.15901 15.841C1.5 15.182 1.5 14.1213 1.5 12Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M6 12.75C6.41421 12.75 6.75 12.4142 6.75 12C6.75 11.5858 6.41421 11.25 6 11.25C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.4142 5.58579 12.75 6 12.75Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M9 12.75C9.41421 12.75 9.75 12.4142 9.75 12C9.75 11.5858 9.41421 11.25 9 11.25C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M12.75 12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12C11.25 11.5858 11.5858 11.25 12 11.25C12.4142 11.25 12.75 11.5858 12.75 12Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M5.0625 6C5.0625 3.82538 6.82538 2.0625 9 2.0625C11.1746 2.0625 12.9375 3.82538 12.9375 6V7.50268C13.363 7.50665 13.7351 7.51651 14.0625 7.54096V6C14.0625 3.20406 11.7959 0.9375 9 0.9375C6.20406 0.9375 3.9375 3.20406 3.9375 6V7.54096C4.26488 7.51651 4.63698 7.50665 5.0625 7.50268V6Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </span>
                                        <span className="absolute end-4 top-1/2 -translate-y-1/2">
                                            {showPassword ? (
                                                <span onClick={handleTogglePassword}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z" stroke="currentColor" stroke-width="1.5" />
                                                        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="1.5" />
                                                    </svg>
                                                </span>
                                            ) : (
                                                <span onClick={handleTogglePassword}>
                                                    <svg width="16" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1.68936 0.704561C1.52619 0.323838 1.08528 0.147475 0.704561 0.310641C0.323838 0.473808 0.147475 0.914717 0.310641 1.29544L1.68936 0.704561ZM14.5872 7.3287L14.3125 6.63082L14.5872 7.3287ZM8.04145 7.73774C8.26736 7.39055 8.16904 6.92597 7.82185 6.70006C7.47466 6.47416 7.01008 6.57247 6.78417 6.91966L8.04145 7.73774ZM5.37136 9.09096C5.14545 9.43815 5.24377 9.90273 5.59096 10.1286C5.93815 10.3545 6.40273 10.2562 6.62864 9.90904L5.37136 9.09096ZM21.6894 1.29544C21.8525 0.914717 21.6762 0.473808 21.2954 0.310641C20.9147 0.147475 20.4738 0.323838 20.3106 0.704561L21.6894 1.29544ZM18 5.12884L17.4867 4.58199V4.58199L18 5.12884ZM18.9697 7.15917C19.2626 7.45206 19.7374 7.45206 20.0303 7.15917C20.3232 6.86628 20.3232 6.3914 20.0303 6.09851L18.9697 7.15917ZM10.25 10.5C10.25 10.9142 10.5858 11.25 11 11.25C11.4142 11.25 11.75 10.9142 11.75 10.5H10.25ZM15.3714 9.90904C15.5973 10.2562 16.0619 10.3545 16.409 10.1286C16.7562 9.90273 16.8545 9.43815 16.6286 9.09096L15.3714 9.90904ZM4.53033 5.65917C4.82322 5.36627 4.82322 4.8914 4.53033 4.59851C4.23744 4.30561 3.76256 4.30561 3.46967 4.59851L4.53033 5.65917ZM1.96967 6.09851C1.67678 6.3914 1.67678 6.86627 1.96967 7.15917C2.26256 7.45206 2.73744 7.45206 3.03033 7.15917L1.96967 6.09851ZM11 7.25C7.77611 7.25 5.46133 5.6446 3.9246 3.98966C3.15645 3.16243 2.59325 2.33284 2.22259 1.71014C2.03769 1.3995 1.90187 1.14232 1.8134 0.965371C1.76919 0.876955 1.73689 0.808747 1.71627 0.764114C1.70597 0.741803 1.69859 0.725401 1.69411 0.71533C1.69187 0.710295 1.69036 0.706845 1.68957 0.705032C1.68917 0.704125 1.68896 0.703628 1.68892 0.703548C1.68891 0.703507 1.68893 0.703571 1.68901 0.703739C1.68904 0.703823 1.68913 0.704029 1.68915 0.704071C1.68925 0.704302 1.68936 0.704561 1 1C0.310641 1.29544 0.310775 1.29575 0.31092 1.29609C0.310984 1.29624 0.311141 1.2966 0.311269 1.2969C0.311524 1.29749 0.311827 1.2982 0.312176 1.299C0.312874 1.30062 0.31376 1.30266 0.314833 1.30512C0.316979 1.31003 0.319875 1.31662 0.323526 1.32483C0.330827 1.34125 0.34115 1.36415 0.354526 1.39311C0.381273 1.45102 0.420263 1.5332 0.471758 1.63619C0.574692 1.84206 0.727935 2.13175 0.933655 2.47736C1.34425 3.16716 1.96855 4.08757 2.8254 5.01034C4.53867 6.8554 7.22389 8.75 11 8.75V7.25ZM14.3125 6.63082C13.3421 7.01276 12.2417 7.25 11 7.25V8.75C12.4382 8.75 13.7246 8.47424 14.8619 8.02658L14.3125 6.63082ZM6.78417 6.91966L5.37136 9.09096L6.62864 9.90904L8.04145 7.73774L6.78417 6.91966ZM21 1C20.3106 0.704561 20.3107 0.70441 20.3108 0.704267C20.3108 0.70423 20.3108 0.704096 20.3109 0.704023C20.3109 0.703877 20.311 0.703764 20.311 0.703683C20.3111 0.703523 20.3111 0.703494 20.3111 0.703595C20.311 0.703798 20.3107 0.704522 20.3101 0.705758C20.309 0.70823 20.307 0.712749 20.3041 0.719241C20.2983 0.732226 20.2889 0.753092 20.2758 0.781246C20.2495 0.837568 20.2086 0.922954 20.1526 1.03267C20.0406 1.25227 19.869 1.56831 19.6354 1.9432C19.1669 2.69516 18.4563 3.67197 17.4867 4.58199L18.5133 5.67569C19.6023 4.65348 20.3917 3.56587 20.9085 2.73646C21.1676 2.32068 21.36 1.9668 21.4889 1.71415C21.5533 1.58775 21.602 1.48643 21.6353 1.41507C21.6519 1.37939 21.6647 1.35118 21.6737 1.33104C21.6782 1.32097 21.6818 1.31292 21.6844 1.30696C21.6857 1.30398 21.6867 1.30153 21.6876 1.2996C21.688 1.29864 21.6883 1.29781 21.6886 1.29712C21.6888 1.29677 21.6889 1.29646 21.689 1.29618C21.6891 1.29604 21.6892 1.29585 21.6892 1.29578C21.6893 1.29561 21.6894 1.29544 21 1ZM17.4867 4.58199C16.6277 5.38825 15.5739 6.13433 14.3125 6.63082L14.8619 8.02658C16.3355 7.44656 17.5466 6.58302 18.5133 5.67569L17.4867 4.58199ZM17.4697 5.65917L18.9697 7.15917L20.0303 6.09851L18.5303 4.59851L17.4697 5.65917ZM10.25 8V10.5H11.75V8H10.25ZM13.9586 7.73774L15.3714 9.90904L16.6286 9.09096L15.2158 6.91966L13.9586 7.73774ZM3.46967 4.59851L1.96967 6.09851L3.03033 7.15917L4.53033 5.65917L3.46967 4.59851Z" fill="currentColor" />
                                                    </svg>
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                </div>
                                {otpSent ? (<div>
                                    <label htmlFor="Otp">Otp</label>
                                    <div className="relative text-white-dark">
                                        <input id="Otp" type="text" pattern="[0-9]*" placeholder="Enter Otp" onChange={handleTextbox(setOtp)} onKeyPress={handleKeyPress} className="form-input ps-10 placeholder:text-white-dark" minLength={6} maxLength={6} required tabIndex={3} />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.2084 13.5521C16.3025 13.5521 18 11.8615 18 9.77606C18 7.6906 16.3025 6 14.2084 6C12.1144 6 10.4169 7.6906 10.4169 9.77606C10.4169 10.742 10.8578 11.4446 10.8578 11.4446L6.27264 16.011C6.0669 16.2159 5.77886 16.7486 6.27264 17.2404L6.8017 17.7673C7.00743 17.9429 7.52471 18.1888 7.94796 17.7673L8.56519 17.1526C9.18242 17.7673 9.88782 17.416 10.1523 17.0647C10.5932 16.45 10.0642 15.8353 10.0642 15.8353L10.2405 15.6597C11.087 16.5027 11.8277 16.011 12.0922 15.6597C12.5331 15.045 12.0922 14.4303 12.0922 14.4303C11.9159 14.079 11.5632 14.079 12.004 13.64L12.5331 13.113C12.9564 13.4643 13.8264 13.5521 14.2084 13.5521Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                                <path opacity="0.5" d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>) : ("")}
                                {otpSent ? (
                                    <button
                                        type="submit"
                                        className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                                        disabled={loginInitiated}
                                        tabIndex={5}
                                    >
                                        {loginInitiated ? (
                                            <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span>
                                        ) : (
                                            "Sign In"
                                        )}&nbsp;
                                        {loginInitiated && "Logging In"}
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={sendOtp}
                                        className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                                        disabled={otpSending}
                                        tabIndex={4}
                                    >
                                        {otpSending ? (
                                            <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span>
                                        ) : (
                                            "Send Otp"
                                        )}&nbsp;
                                        {otpSending && "Sending Otp"}
                                    </button>
                                )}
                            </form>

                            <div className="relative my-7 text-center md:mb-9">
                                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                            </div>
                            <div className="mb-10 md:mb-[60px]">
                                <ul className="flex justify-center gap-3.5">
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path
                                                    d="M8 2.05C9.925 2.05 10.1875 2.05 10.975 2.05C11.675 2.05 12.025 2.225 12.2875 2.3125C12.6375 2.4875 12.9 2.575 13.1625 2.8375C13.425 3.1 13.6 3.3625 13.6875 3.7125C13.775 3.975 13.8625 4.325 13.95 5.025C13.95 5.8125 13.95 5.9875 13.95 8C13.95 10.0125 13.95 10.1875 13.95 10.975C13.95 11.675 13.775 12.025 13.6875 12.2875C13.5125 12.6375 13.425 12.9 13.1625 13.1625C12.9 13.425 12.6375 13.6 12.2875 13.6875C12.025 13.775 11.675 13.8625 10.975 13.95C10.1875 13.95 10.0125 13.95 8 13.95C5.9875 13.95 5.8125 13.95 5.025 13.95C4.325 13.95 3.975 13.775 3.7125 13.6875C3.3625 13.5125 3.1 13.425 2.8375 13.1625C2.575 12.9 2.4 12.6375 2.3125 12.2875C2.225 12.025 2.1375 11.675 2.05 10.975C2.05 10.1875 2.05 10.0125 2.05 8C2.05 5.9875 2.05 5.8125 2.05 5.025C2.05 4.325 2.225 3.975 2.3125 3.7125C2.4875 3.3625 2.575 3.1 2.8375 2.8375C3.1 2.575 3.3625 2.4 3.7125 2.3125C3.975 2.225 4.325 2.1375 5.025 2.05C5.8125 2.05 6.075 2.05 8 2.05ZM8 0.737503C5.9875 0.737503 5.8125 0.737503 5.025 0.737503C4.2375 0.737503 3.7125 0.912504 3.275 1.0875C2.8375 1.2625 2.4 1.525 1.9625 1.9625C1.525 2.4 1.35 2.75 1.0875 3.275C0.912504 3.7125 0.825003 4.2375 0.737503 5.025C0.737503 5.8125 0.737503 6.075 0.737503 8C0.737503 10.0125 0.737503 10.1875 0.737503 10.975C0.737503 11.7625 0.912504 12.2875 1.0875 12.725C1.2625 13.1625 1.525 13.6 1.9625 14.0375C2.4 14.475 2.75 14.65 3.275 14.9125C3.7125 15.0875 4.2375 15.175 5.025 15.2625C5.8125 15.2625 6.075 15.2625 8 15.2625C9.925 15.2625 10.1875 15.2625 10.975 15.2625C11.7625 15.2625 12.2875 15.0875 12.725 14.9125C13.1625 14.7375 13.6 14.475 14.0375 14.0375C14.475 13.6 14.65 13.25 14.9125 12.725C15.0875 12.2875 15.175 11.7625 15.2625 10.975C15.2625 10.1875 15.2625 9.925 15.2625 8C15.2625 6.075 15.2625 5.8125 15.2625 5.025C15.2625 4.2375 15.0875 3.7125 14.9125 3.275C14.7375 2.8375 14.475 2.4 14.0375 1.9625C13.6 1.525 13.25 1.35 12.725 1.0875C12.2875 0.912504 11.7625 0.825003 10.975 0.737503C10.1875 0.737503 10.0125 0.737503 8 0.737503Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M8 4.2375C5.9 4.2375 4.2375 5.9 4.2375 8C4.2375 10.1 5.9 11.7625 8 11.7625C10.1 11.7625 11.7625 10.1 11.7625 8C11.7625 5.9 10.1 4.2375 8 4.2375ZM8 10.45C6.6875 10.45 5.55 9.4 5.55 8C5.55 6.6875 6.6 5.55 8 5.55C9.3125 5.55 10.45 6.6 10.45 8C10.45 9.3125 9.3125 10.45 8 10.45Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M11.85 5.025C12.3333 5.025 12.725 4.63325 12.725 4.15C12.725 3.66675 12.3333 3.275 11.85 3.275C11.3668 3.275 10.975 3.66675 10.975 4.15C10.975 4.63325 11.3668 5.025 11.85 5.025Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path
                                                    d="M14 7C14 3.15 10.85 0 7 0C3.15 0 0 3.15 0 7C0 10.5 2.5375 13.3875 5.8625 13.9125V9.0125H4.1125V7H5.8625V5.425C5.8625 3.675 6.9125 2.7125 8.4875 2.7125C9.275 2.7125 10.0625 2.8875 10.0625 2.8875V4.6375H9.1875C8.3125 4.6375 8.05 5.1625 8.05 5.6875V7H9.975L9.625 9.0125H7.9625V14C11.4625 13.475 14 10.5 14 7Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                                                <path
                                                    d="M14 1.625C13.475 1.8875 12.95 1.975 12.3375 2.0625C12.95 1.7125 13.3875 1.1875 13.5625 0.4875C13.0375 0.8375 12.425 1.0125 11.725 1.1875C11.2 0.6625 10.4125 0.3125 9.625 0.3125C7.7875 0.3125 6.3875 2.0625 6.825 3.8125C4.4625 3.725 2.3625 2.5875 0.875 0.8375C0.0875 2.15 0.525 3.8125 1.75 4.6875C1.3125 4.6875 0.875 4.5125 0.4375 4.3375C0.4375 5.65 1.4 6.875 2.7125 7.225C2.275 7.3125 1.8375 7.4 1.4 7.3125C1.75 8.45 2.8 9.325 4.1125 9.325C3.0625 10.1125 1.4875 10.55 0 10.375C1.3125 11.1625 2.8 11.6875 4.375 11.6875C9.7125 11.6875 12.6875 7.225 12.5125 3.1125C13.125 2.7625 13.65 2.2375 14 1.625Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M13.8512 7.15912C13.8512 6.66275 13.8066 6.18548 13.7239 5.72729H7.13116V8.43503H10.8984C10.7362 9.31003 10.243 10.0514 9.50162 10.5478V12.3041H11.7639C13.0875 11.0855 13.8512 9.29094 13.8512 7.15912Z"
                                                    fill="white"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M7.13089 14C9.0209 14 10.6054 13.3731 11.7636 12.3041L9.50135 10.5477C8.87454 10.9677 8.07272 11.2159 7.13089 11.2159C5.30771 11.2159 3.76452 9.9845 3.21407 8.32996H0.875427V10.1436C2.02725 12.4313 4.39453 14 7.13089 14Z"
                                                    fill="white"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M3.21435 8.32997C3.07435 7.90997 2.99481 7.46133 2.99481 6.99997C2.99481 6.5386 3.07435 6.08996 3.21435 5.66996V3.85632H0.875712C0.40162 4.80133 0.131165 5.87042 0.131165 6.99997C0.131165 8.12951 0.40162 9.19861 0.875712 10.1436L3.21435 8.32997Z"
                                                    fill="white"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M7.13089 2.7841C8.15862 2.7841 9.08135 3.13728 9.80681 3.83092L11.8145 1.82319C10.6023 0.693638 9.01772 0 7.13089 0C4.39453 0 2.02725 1.56864 0.875427 3.85637L3.21407 5.67001C3.76452 4.01546 5.30771 2.7841 7.13089 2.7841Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="text-center dark:text-white">
                                Don't have an account ?&nbsp;
                                <Link to="/auth/cover-register" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    SIGN UP
                                </Link>
                            </div>
                        </div>
                        <p className="absolute bottom-6 w-full text-center dark:text-white">© {new Date().getFullYear()}.Jay Chauhan All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default LoginCover;
