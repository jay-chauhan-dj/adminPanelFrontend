import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { getSocialUrl } from '../utils/socialValidation';

interface ProfilePreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    socialLinks: {
        linkedin?: string;
        twitter?: string;
        facebook?: string;
        github?: string;
    };
    userName: string;
}

const ProfilePreviewModal = ({ isOpen, onClose, socialLinks, userName }: ProfilePreviewModalProps) => {
    const platforms = [
        { key: 'linkedin', icon: 'linkedin', color: 'btn-primary' },
        { key: 'twitter', icon: 'twitter', color: 'btn-info' },
        { key: 'facebook', icon: 'facebook', color: 'btn-primary' },
        { key: 'github', icon: 'github', color: 'btn-dark' }
    ];

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-[black]/60 z-[999]" />
                </Transition.Child>
                <div className="fixed inset-0 z-[999] overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                    <h5 className="text-lg font-bold">Profile Preview</h5>
                                    <button type="button" onClick={onClose} className="text-white-dark hover:text-dark">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="p-5">
                                    <div className="text-center mb-5">
                                        <p className="text-sm text-white-dark mb-3">This is how your social icons will appear on your profile</p>
                                        <p className="font-semibold text-lg">{userName}</p>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        {platforms.map(platform => {
                                            const username = socialLinks[platform.key as keyof typeof socialLinks];
                                            const isActive = username && username.trim() !== '';
                                            
                                            return (
                                                <button
                                                    key={platform.key}
                                                    className={`btn ${platform.color} flex items-center justify-center rounded-full w-10 h-10 p-0 ${!isActive ? 'opacity-30 cursor-not-allowed' : ''}`}
                                                    disabled={!isActive}
                                                    onClick={() => isActive && window.open(getSocialUrl(platform.key, username), '_blank')}
                                                    title={isActive ? `Visit ${platform.key}` : `No ${platform.key} account linked`}
                                                >
                                                    {platform.icon === 'linkedin' && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                                            <rect x="2" y="9" width="4" height="12"></rect>
                                                            <circle cx="4" cy="4" r="2"></circle>
                                                        </svg>
                                                    )}
                                                    {platform.icon === 'twitter' && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                                        </svg>
                                                    )}
                                                    {platform.icon === 'facebook' && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                                        </svg>
                                                    )}
                                                    {platform.icon === 'github' && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                                        </svg>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-8 flex items-center justify-end">
                                        <button type="button" onClick={onClose} className="btn btn-outline-danger">
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ProfilePreviewModal;