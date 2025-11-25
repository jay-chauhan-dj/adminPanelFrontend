export const hasAccess = (area: string): boolean => {
    const access = localStorage.getItem('userAccess');
    if (!access) return true; // Allow all if no access data
    try {
        const accessAreas = JSON.parse(access);
        if (!accessAreas || accessAreas.length === 0) return true;
        return accessAreas.includes(area);
    } catch {
        return true;
    }
};

export const getUserRole = (): string => {
    return localStorage.getItem('userRole') || '';
};

export const isAdmin = (): boolean => {
    return getUserRole() === 'Admin';
};
