import { useState, useEffect } from 'react';
import { getRequest, postRequest, putRequest, deleteRequest } from '../../utils/Request';
import IconEye from '../../components/Icon/IconEye';

const AppManagement = () => {
    const [applications, setApplications] = useState<any[]>([]);
    const [frontendTechs, setFrontendTechs] = useState<any[]>([]);
    const [backendTechs, setBackendTechs] = useState<any[]>([]);
    const [databaseTechs, setDatabaseTechs] = useState<any[]>([]);
    const [servers, setServers] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showTechModal, setShowTechModal] = useState(false);
    const [showServerModal, setShowServerModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isSavingApp, setIsSavingApp] = useState(false);
    const [isSavingTech, setIsSavingTech] = useState(false);
    const [isSavingServer, setIsSavingServer] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [urlError, setUrlError] = useState('');
    const [deployScriptError, setDeployScriptError] = useState('');
    const [slackWebhookError, setSlackWebhookError] = useState('');
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [visibleSecrets, setVisibleSecrets] = useState<{ [key: number]: boolean }>({});
    const [newTech, setNewTech] = useState({ techName: '', techType: 'Frontend' });
    const [newServer, setNewServer] = useState({ serverName: '', serverType: 'D' });
    const [currentApp, setCurrentApp] = useState({
        appId: null,
        appName: '',
        appURL: '',
        appFrontendTechId: '',
        appBackendTechId: '',
        appDatabaseId: '',
        appDatabaseName: '',
        appDatabaseType: '',
        appPort: '',
        appServerId: '',
        appDeployScript: '',
        appSlackWebhook: ''
    });

    useEffect(() => {
        fetchApplications();
        fetchTechnologies();
        fetchServers();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await getRequest('/v1/appManagement/applications');
            if (response?.data && Array.isArray(response.data)) {
                console.log('Applications data:', response.data);
                setApplications(response.data);
            }
        } catch (error: any) {
            alert('Failed to fetch applications: ' + (error?.response?.data?.message || error.message));
        }
    };

    const fetchTechnologies = async () => {
        try {
            const [frontend, backend, database] = await Promise.all([
                getRequest('/v1/appManagement/technologies?type=Frontend'),
                getRequest('/v1/appManagement/technologies?type=Backend'),
                getRequest('/v1/appManagement/technologies?type=Database')
            ]);
            if (frontend?.data) setFrontendTechs(frontend.data);
            if (backend?.data) setBackendTechs(backend.data);
            if (database?.data) setDatabaseTechs(database.data);
        } catch (error: any) {
            alert('Failed to fetch technologies: ' + (error?.response?.data?.message || error.message));
        }
    };

    const fetchServers = async () => {
        try {
            const response = await getRequest('/v1/appManagement/servers');
            if (response?.data && Array.isArray(response.data)) {
                setServers(response.data);
            }
        } catch (error: any) {
            alert('Failed to fetch servers: ' + (error?.response?.data?.message || error.message));
        }
    };

    const handleSubmit = async () => {
        setFormSubmitted(true);
        setUrlError('');
        setDeployScriptError('');
        setSlackWebhookError('');
        
        if (!currentApp.appName || !currentApp.appURL || !currentApp.appDeployScript || !currentApp.appSlackWebhook) {
            return;
        }
        
        const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
        if (!urlRegex.test(currentApp.appURL)) {
            setUrlError('Please enter a valid URL (e.g., https://example.com)');
            return;
        }
        
        const pathRegex = /^(\/[a-zA-Z0-9_\-\.]+)+(\/[a-zA-Z0-9_\-\.]+)*$/;
        if (!pathRegex.test(currentApp.appDeployScript)) {
            setDeployScriptError('Please enter a valid file path (e.g., /var/www/deploy.sh)');
            return;
        }
        
        if (!urlRegex.test(currentApp.appSlackWebhook)) {
            setSlackWebhookError('Please enter a valid Slack webhook URL');
            return;
        }

        setIsSavingApp(true);
        try {
            if (editMode) {
                await putRequest(`/v1/appManagement/applications/${currentApp.appId}`, currentApp);
                setShowModal(false);
                resetForm();
                setFormSubmitted(false);
                await fetchApplications();
            } else {
                await postRequest('/v1/appManagement/applications', currentApp);
                setShowModal(false);
                resetForm();
                setFormSubmitted(false);
                await fetchApplications();
            }
        } catch (error: any) {
            alert('Failed to save application: ' + (error?.response?.data?.message || error.message));
        } finally {
            setIsSavingApp(false);
        }
    };

    const handleDelete = async (appId: number) => {
        try {
            await deleteRequest(`/v1/appManagement/applications/${appId}`);
            await fetchApplications();
        } catch (error: any) {
            alert('Failed to delete application: ' + (error?.response?.data?.message || error.message));
        }
    };

    const openAddModal = () => {
        resetForm();
        setEditMode(false);
        setFormSubmitted(false);
        setUrlError('');
        setDeployScriptError('');
        setSlackWebhookError('');
        setShowModal(true);
    };

    const openEditModal = (app: any) => {
        setCurrentApp({
            appId: app.appId,
            appName: app.appName,
            appURL: app.appURL,
            appFrontendTechId: app.appFrontendTechId || '',
            appBackendTechId: app.appBackendTechId || '',
            appDatabaseId: app.appDatabaseId || '',
            appDatabaseName: app.appDatabaseName || '',
            appDatabaseType: app.appDatabaseType || '',
            appPort: app.appPort || '',
            appServerId: app.appServerId || '',
            appDeployScript: app.appDeployScript || '',
            appSlackWebhook: app.appSlackWebhook || ''
        });
        setEditMode(true);
        setFormSubmitted(false);
        setUrlError('');
        setDeployScriptError('');
        setSlackWebhookError('');
        setShowModal(true);
    };

    const resetForm = () => {
        setCurrentApp({
            appId: null,
            appName: '',
            appURL: '',
            appFrontendTechId: '',
            appBackendTechId: '',
            appDatabaseId: '',
            appDatabaseName: '',
            appDatabaseType: '',
            appPort: '',
            appServerId: '',
            appDeployScript: '',
            appSlackWebhook: ''
        });
    };

    const handleAddTechnology = async () => {
        setIsSavingTech(true);
        try {
            await postRequest('/v1/appManagement/technologies', newTech);
            setShowTechModal(false);
            setNewTech({ techName: '', techType: 'Frontend' });
            await fetchTechnologies();
        } catch (error: any) {
            alert('Failed to add technology: ' + (error?.response?.data?.message || error.message));
        } finally {
            setIsSavingTech(false);
        }
    };

    const handleDeleteTechnology = async (techId: number) => {
        try {
            await deleteRequest(`/v1/appManagement/technologies/${techId}`);
            await fetchTechnologies();
        } catch (error: any) {
            alert('Failed to delete technology: ' + (error?.response?.data?.message || error.message));
        }
    };

    const handleAddServer = async () => {
        setIsSavingServer(true);
        try {
            await postRequest('/v1/appManagement/servers', newServer);
            setShowServerModal(false);
            setNewServer({ serverName: '', serverType: 'D' });
            await fetchServers();
        } catch (error: any) {
            alert('Failed to add server: ' + (error?.response?.data?.message || error.message));
        } finally {
            setIsSavingServer(false);
        }
    };

    const handleDeleteServer = async (serverId: number) => {
        try {
            await deleteRequest(`/v1/appManagement/servers/${serverId}`);
            await fetchServers();
        } catch (error: any) {
            alert('Failed to delete server: ' + (error?.response?.data?.message || error.message));
        }
    };

    const getServerTypeBadge = (type: string) => {
        const badges: any = {
            'P': { label: 'Production', color: 'bg-success' },
            'D': { label: 'Development', color: 'bg-info' },
            'S': { label: 'Staging', color: 'bg-warning' }
        };
        return badges[type] || { label: type, color: 'bg-secondary' };
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Application Management</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your applications and their configurations</p>
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-outline-primary" onClick={() => setShowTechModal(true)}>Add Technology</button>
                    <button className="btn btn-outline-primary" onClick={() => setShowServerModal(true)}>Add Server</button>
                    <button className="btn btn-primary" onClick={openAddModal}>
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Add Application
                    </button>
                </div>
            </div>

            <div className="panel">
                <div className="table-responsive">
                    <table className="table-hover">
                        <thead>
                            <tr>
                                <th className="w-16">#</th>
                                <th>App Name</th>
                                <th>URL</th>
                                <th>Frontend</th>
                                <th>Backend</th>
                                <th>Database</th>
                                <th>DB Name</th>
                                <th>DB Type</th>
                                <th>Port</th>
                                <th>Server</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app, index) => (
                                <>
                                <tr key={app.appId} className={(app.appDeployScript || app.appSlackWebhook || app.appSecret) ? "cursor-pointer" : ""} onClick={() => (app.appDeployScript || app.appSlackWebhook || app.appSecret) && setExpandedRow(expandedRow === app.appId ? null : app.appId)}>
                                    <td className="text-center font-semibold text-gray-500">{app.appId}</td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            {(app.appDeployScript || app.appSlackWebhook || app.appSecret) && (
                                                <svg className={`w-4 h-4 transition-transform ${expandedRow === app.appId ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            )}
                                            <span className="font-semibold">{app.appName}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <a href={app.appURL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                            {app.appURL}
                                        </a>
                                    </td>
                                    <td>
                                        {app.frontendTech ? (
                                            <span className="badge bg-primary">{app.frontendTech}</span>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td>
                                        {app.backendTech ? (
                                            <span className="badge bg-info">{app.backendTech}</span>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td>
                                        {app.databaseTech ? (
                                            <span className="badge bg-secondary">{app.databaseTech}</span>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td>
                                        {app.appDatabaseName ? (
                                            <span className="font-mono text-sm">{app.appDatabaseName}</span>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td>
                                        {app.appDatabaseType ? (
                                            <span className="badge bg-dark">{app.appDatabaseType}</span>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td>
                                        {app.appPort ? (
                                            <span className="font-mono text-sm">{app.appPort}</span>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td>
                                        {app.serverName ? (
                                            <div>
                                                <div className="font-medium">{app.serverName}</div>
                                                <span className={`badge ${getServerTypeBadge(app.serverType).color} text-xs`}>
                                                    {getServerTypeBadge(app.serverType).label}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="btn btn-sm btn-outline-primary" onClick={(e) => { e.stopPropagation(); openEditModal(app); }}>
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={(e) => { e.stopPropagation(); handleDelete(app.appId); }}>
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {expandedRow === app.appId && (app.appDeployScript || app.appSlackWebhook || app.appSecret) && (
                                    <tr key={`${app.appId}-details`}>
                                        <td colSpan={11} className="bg-gray-50 dark:bg-gray-800">
                                            <div className="p-4 space-y-3">
                                                <div className="grid grid-cols-3 gap-4">
                                                    {app.appDeployScript && (
                                                        <div>
                                                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Deploy Script</p>
                                                            <p className="text-sm font-mono bg-white dark:bg-gray-900 p-2 rounded border">{app.appDeployScript}</p>
                                                        </div>
                                                    )}
                                                    {app.appSlackWebhook && (
                                                        <div>
                                                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Slack Webhook</p>
                                                            <p className="text-sm font-mono bg-white dark:bg-gray-900 p-2 rounded border truncate">{app.appSlackWebhook}</p>
                                                        </div>
                                                    )}
                                                    {app.appSecret && (
                                                        <div>
                                                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Secret Key</p>
                                                            <div className="relative">
                                                                <p className="text-sm font-mono bg-white dark:bg-gray-900 p-2 pr-10 rounded border truncate">
                                                                    {visibleSecrets[app.appId] ? app.appSecret : '•'.repeat(Math.min(app.appSecret.length, 40))}
                                                                </p>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setVisibleSecrets(prev => ({ ...prev, [app.appId]: !prev[app.appId] }));
                                                                    }}
                                                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary dark:hover:text-primary transition"
                                                                >
                                                                    {visibleSecrets[app.appId] ? (
                                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M2 2L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                                            <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                                            <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                                        </svg>
                                                                    ) : (
                                                                        <IconEye className="w-5 h-5" />
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                </>
                            ))}
                            {applications.length === 0 && (
                                <tr>
                                    <td colSpan={11} className="text-center text-gray-400 py-8">
                                        No applications found. Click "Add Application" to create one.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl">
                        <style>{`
                            input.submitted:invalid {
                                border-color: #ef4444 !important;
                            }
                        `}</style>
                        <div className="bg-gradient-to-r from-primary to-purple-600 p-6">
                            <h3 className="text-2xl font-bold text-white">{editMode ? 'Edit Application' : 'Add New Application'}</h3>
                            <p className="text-white/80 text-sm mt-1">Fill in the application details</p>
                        </div>
                        
                        <div className="p-6 space-y-4 max-h-[calc(90vh-200px)] overflow-y-auto">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Application Name *</label>
                                <input
                                    type="text"
                                    className={`form-input w-full ${formSubmitted ? 'submitted' : ''}`}
                                    placeholder="e.g., Admin Dashboard"
                                    value={currentApp.appName}
                                    onChange={(e) => setCurrentApp({ ...currentApp, appName: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Application URL *</label>
                                <input
                                    type="url"
                                    className={`form-input w-full ${formSubmitted ? 'submitted' : ''} ${urlError ? 'border-red-500' : ''}`}
                                    placeholder="https://example.com"
                                    value={currentApp.appURL}
                                    onChange={(e) => { setCurrentApp({ ...currentApp, appURL: e.target.value }); setUrlError(''); }}
                                    required
                                />
                                {urlError && <p className="text-xs text-red-500 mt-1">{urlError}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Frontend Technology</label>
                                <select
                                    className="form-select w-full"
                                    value={currentApp.appFrontendTechId}
                                    onChange={(e) => setCurrentApp({ ...currentApp, appFrontendTechId: e.target.value })}
                                >
                                    <option value="">Select Frontend</option>
                                    {frontendTechs.map((tech) => (
                                        <option key={tech.techId} value={tech.techId}>{tech.techName}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Backend Technology</label>
                                <select
                                    className="form-select w-full"
                                    value={currentApp.appBackendTechId}
                                    onChange={(e) => setCurrentApp({ ...currentApp, appBackendTechId: e.target.value })}
                                >
                                    <option value="">Select Backend</option>
                                    {backendTechs.map((tech) => (
                                        <option key={tech.techId} value={tech.techId}>{tech.techName}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Database</label>
                                <select
                                    className="form-select w-full"
                                    value={currentApp.appDatabaseId}
                                    onChange={(e) => setCurrentApp({ ...currentApp, appDatabaseId: e.target.value })}
                                >
                                    <option value="">Select Database</option>
                                    {databaseTechs.map((tech) => (
                                        <option key={tech.techId} value={tech.techId}>{tech.techName}</option>
                                    ))}
                                </select>
                            </div>

                            {currentApp.appDatabaseId && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Database Name</label>
                                        <input
                                            type="text"
                                            className="form-input w-full"
                                            placeholder="e.g., mtpl_website"
                                            value={currentApp.appDatabaseName}
                                            onChange={(e) => setCurrentApp({ ...currentApp, appDatabaseName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Database Type</label>
                                        <select
                                            className="form-select w-full"
                                            value={currentApp.appDatabaseType}
                                            onChange={(e) => setCurrentApp({ ...currentApp, appDatabaseType: e.target.value })}
                                        >
                                            <option value="">Select Type</option>
                                            <option value="Relational">Relational</option>
                                            <option value="NoSQL">NoSQL</option>
                                            <option value="In-Memory">In-Memory</option>
                                            <option value="Graph">Graph</option>
                                            <option value="Time-Series">Time-Series</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {currentApp.appBackendTechId && (
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Port</label>
                                    <input
                                        type="text"
                                        className="form-input w-full"
                                        placeholder="e.g., 3000"
                                        value={currentApp.appPort}
                                        onChange={(e) => setCurrentApp({ ...currentApp, appPort: e.target.value })}
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold mb-2">Server</label>
                                <select
                                    className="form-select w-full"
                                    value={currentApp.appServerId}
                                    onChange={(e) => setCurrentApp({ ...currentApp, appServerId: e.target.value })}
                                >
                                    <option value="">Select Server</option>
                                    {servers.map((server) => (
                                        <option key={server.serverId} value={server.serverId}>
                                            {server.serverName} ({getServerTypeBadge(server.serverType).label})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Deploy Script *</label>
                                <input
                                    type="text"
                                    className={`form-input w-full ${formSubmitted ? 'submitted' : ''} ${deployScriptError ? 'border-red-500' : ''}`}
                                    placeholder="e.g., /var/www/app/deploy.sh"
                                    value={currentApp.appDeployScript}
                                    onChange={(e) => { setCurrentApp({ ...currentApp, appDeployScript: e.target.value }); setDeployScriptError(''); }}
                                    required
                                />
                                {deployScriptError && <p className="text-xs text-red-500 mt-1">{deployScriptError}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Slack Webhook *</label>
                                <input
                                    type="url"
                                    className={`form-input w-full ${formSubmitted ? 'submitted' : ''} ${slackWebhookError ? 'border-red-500' : ''}`}
                                    placeholder="https://hooks.slack.com/services/..."
                                    value={currentApp.appSlackWebhook}
                                    onChange={(e) => { setCurrentApp({ ...currentApp, appSlackWebhook: e.target.value }); setSlackWebhookError(''); }}
                                    required
                                />
                                {slackWebhookError && <p className="text-xs text-red-500 mt-1">{slackWebhookError}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                            <button className="btn btn-outline-danger" onClick={() => setShowModal(false)} disabled={isSavingApp}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSubmit} disabled={isSavingApp}>
                                {isSavingApp ? (
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
                                        {editMode ? 'Update' : 'Create'}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showTechModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
                        <div className="bg-gradient-to-r from-primary to-purple-600 p-6">
                            <h3 className="text-2xl font-bold text-white">Add Technology</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Technology Name *</label>
                                <input type="text" className="form-input w-full" placeholder="e.g., React" value={newTech.techName} onChange={(e) => setNewTech({ ...newTech, techName: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Type *</label>
                                <select className="form-select w-full" value={newTech.techType} onChange={(e) => setNewTech({ ...newTech, techType: e.target.value })}>
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="Database">Database</option>
                                </select>
                            </div>
                            <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                                    <p className="text-sm font-semibold">Current Technologies</p>
                                </div>
                                <div className="max-h-60 overflow-y-auto relative">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-semibold bg-gray-50 dark:bg-gray-800">Name</th>
                                                <th className="px-4 py-2 text-left text-xs font-semibold bg-gray-50 dark:bg-gray-800">Type</th>
                                                <th className="px-4 py-2 text-center text-xs font-semibold w-16 bg-gray-50 dark:bg-gray-800">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {[...frontendTechs, ...backendTechs, ...databaseTechs].map((tech) => (
                                                <tr key={tech.techId} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                                    <td className="px-4 py-2 text-sm">{tech.techName}</td>
                                                    <td className="px-4 py-2 text-sm"><span className="badge badge-sm bg-primary">{tech.techType}</span></td>
                                                    <td className="px-4 py-2 text-center">
                                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteTechnology(tech.techId)}>
                                                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                            <button className="btn btn-outline-danger" onClick={() => setShowTechModal(false)} disabled={isSavingTech}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleAddTechnology} disabled={isSavingTech}>
                                {isSavingTech ? (
                                    <>
                                        <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Adding...
                                    </>
                                ) : (
                                    'Add'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showServerModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
                        <div className="bg-gradient-to-r from-primary to-purple-600 p-6">
                            <h3 className="text-2xl font-bold text-white">Add Server</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Server Name *</label>
                                <input type="text" className="form-input w-full" placeholder="e.g., Production Server" value={newServer.serverName} onChange={(e) => setNewServer({ ...newServer, serverName: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Type *</label>
                                <select className="form-select w-full" value={newServer.serverType} onChange={(e) => setNewServer({ ...newServer, serverType: e.target.value })}>
                                    <option value="P">Production</option>
                                    <option value="D">Development</option>
                                    <option value="S">Staging</option>
                                </select>
                            </div>
                            <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                                    <p className="text-sm font-semibold">Current Servers</p>
                                </div>
                                <div className="max-h-60 overflow-y-auto relative">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-semibold bg-gray-50 dark:bg-gray-800">Name</th>
                                                <th className="px-4 py-2 text-left text-xs font-semibold bg-gray-50 dark:bg-gray-800">Type</th>
                                                <th className="px-4 py-2 text-center text-xs font-semibold w-16 bg-gray-50 dark:bg-gray-800">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {servers.map((server) => (
                                                <tr key={server.serverId} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                                    <td className="px-4 py-2 text-sm">{server.serverName}</td>
                                                    <td className="px-4 py-2 text-sm"><span className={`badge badge-sm ${getServerTypeBadge(server.serverType).color}`}>{getServerTypeBadge(server.serverType).label}</span></td>
                                                    <td className="px-4 py-2 text-center">
                                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteServer(server.serverId)}>
                                                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                            <button className="btn btn-outline-danger" onClick={() => setShowServerModal(false)} disabled={isSavingServer}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleAddServer} disabled={isSavingServer}>
                                {isSavingServer ? (
                                    <>
                                        <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Adding...
                                    </>
                                ) : (
                                    'Add'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppManagement;
