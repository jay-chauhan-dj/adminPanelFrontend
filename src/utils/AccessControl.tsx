export const hasAccess = (area: string): boolean => {
    const role = getUserRole();
    if (role === 'Admin') return true;
    
    const access = localStorage.getItem('userAccess');
    if (!access) return false;
    
    try {
        const accessAreas = JSON.parse(access);
        if (!accessAreas || accessAreas.length === 0) return false;
        return accessAreas.includes(area);
    } catch {
        return false;
    }
};

export const getUserRole = (): string => {
    return localStorage.getItem('userRole') || '';
};

export const isAdmin = (): boolean => {
    return getUserRole() === 'Admin';
};

export const getAccessAreas = (): string[] => {
    try {
        const access = localStorage.getItem('userAccess');
        return access ? JSON.parse(access) : [];
    } catch {
        return [];
    }
};;
