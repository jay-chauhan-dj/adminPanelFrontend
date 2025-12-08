export const socialValidation = {
    twitter: {
        pattern: /^[A-Za-z0-9_]{1,15}$/,
        message: 'Twitter: 1-15 characters, letters, numbers, underscores only'
    },
    github: {
        pattern: /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/,
        message: 'GitHub: 1-39 characters, alphanumeric and hyphens'
    },
    facebook: {
        pattern: /^[A-Za-z0-9.]{5,50}$/,
        message: 'Facebook: 5-50 characters, alphanumeric and dots'
    },
    linkedin: {
        pattern: /^[A-Za-z0-9-]{3,100}$/,
        message: 'LinkedIn: 3-100 characters, alphanumeric and hyphens'
    }
};

export const validateUsername = (platform: string, username: string): { valid: boolean; message?: string } => {
    if (!username || username.trim() === '') {
        return { valid: true };
    }

    const validation = socialValidation[platform as keyof typeof socialValidation];
    if (!validation) {
        return { valid: false, message: 'Invalid platform' };
    }

    const cleanUsername = username.replace('@', '').trim();
    if (!validation.pattern.test(cleanUsername)) {
        return { valid: false, message: validation.message };
    }

    return { valid: true };
};

export const getSocialUrl = (platform: string, username: string): string => {
    const cleanUsername = username.replace('@', '').trim();
    const urls: { [key: string]: string } = {
        linkedin: `https://linkedin.com/in/${cleanUsername}`,
        twitter: `https://twitter.com/${cleanUsername}`,
        facebook: `https://facebook.com/${cleanUsername}`,
        github: `https://github.com/${cleanUsername}`
    };
    return urls[platform] || '#';
};
