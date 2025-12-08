import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import Swal from 'sweetalert2';
import { postRequest, getRequest } from '../../utils/Request';

const AttendanceSettings = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState({ latitude: '', longitude: '', radius: '' });
    const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const token = localStorage.getItem('accessToken');
    const headers = { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        dispatch(setPageTitle('Attendance Settings'));
        loadSettings();
        getCurrentLocation();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await getRequest('/v1/attendance/settings', {}, headers);
            if (data.success) {
                setSettings({
                    latitude: data.settings.latitude,
                    longitude: data.settings.longitude,
                    radius: data.settings.radius
                });
            }
        } catch (error) {
            console.error('Failed to load settings');
        }
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                }
            );
        }
    };

    const useCurrentLocation = () => {
        if (currentLocation) {
            setSettings({
                ...settings,
                latitude: currentLocation.latitude.toString(),
                longitude: currentLocation.longitude.toString()
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const requestData = {
                latitude: parseFloat(settings.latitude),
                longitude: parseFloat(settings.longitude),
                radius: parseFloat(settings.radius)
            };
            const data = await postRequest('/v1/attendance/settings', requestData, {}, headers);
            if (data.success) {
                Swal.fire('Success', 'Settings updated successfully', 'success');
            } else {
                Swal.fire('Error', data.error || 'Failed to update settings', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to connect to server', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h5 className="font-semibold text-lg dark:text-white-light">Attendance Settings</h5>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="panel">
                    <h6 className="text-lg font-bold mb-4">Office Location Settings</h6>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="latitude">Office Latitude</label>
                            <input
                                id="latitude"
                                type="number"
                                step="any"
                                placeholder="23.022797"
                                className="form-input"
                                value={settings.latitude}
                                onChange={(e) => setSettings({ ...settings, latitude: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="longitude">Office Longitude</label>
                            <input
                                id="longitude"
                                type="number"
                                step="any"
                                placeholder="72.531968"
                                className="form-input"
                                value={settings.longitude}
                                onChange={(e) => setSettings({ ...settings, longitude: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="radius">Geofence Radius (meters)</label>
                            <input
                                id="radius"
                                type="number"
                                placeholder="1000"
                                className="form-input"
                                value={settings.radius}
                                onChange={(e) => setSettings({ ...settings, radius: e.target.value })}
                                required
                            />
                            <small className="text-gray-500">Users must be within this distance to clock in/out</small>
                        </div>

                        <button
                            type="button"
                            className="btn btn-outline-primary w-full"
                            onClick={useCurrentLocation}
                            disabled={!currentLocation}
                        >
                            Use My Current Location
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Settings'}
                        </button>
                    </form>
                </div>

                <div className="panel">
                    <h6 className="text-lg font-bold mb-4">Current Location</h6>
                    {currentLocation ? (
                        <div className="space-y-4">
                            <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
                                <p className="font-semibold mb-2">Your Current Location:</p>
                                <p><strong>Latitude:</strong> {currentLocation.latitude}</p>
                                <p><strong>Longitude:</strong> {currentLocation.longitude}</p>
                            </div>
                            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <p className="font-semibold mb-2">Instructions:</p>
                                <ul className="text-sm space-y-1 list-disc list-inside">
                                    <li>Click "Use My Current Location" to set office location to where you are now</li>
                                    <li>Or manually enter coordinates</li>
                                    <li>Set radius based on your office area</li>
                                    <li>Recommended radius: 50-1000 meters</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                            <p>Getting your location...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AttendanceSettings;
