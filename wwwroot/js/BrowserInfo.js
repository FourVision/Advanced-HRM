window.browserInfo = {
    getSessionId: function () {
        return sessionStorage.getItem('sessionId') || (function () {
            var newSessionId = crypto.randomUUID();
            sessionStorage.setItem('sessionId', newSessionId);
            return newSessionId;
        })();
    },
    getUserAgent: function () {
        return navigator.userAgent;
    },

    getBrowserName: function () {
        var userAgent = navigator.userAgent;
        var browserName = 'Unknown';
        var browserVersion = '';
        var match;
        if (userAgent.indexOf('Edg') !== -1) {
            browserName = 'Edge';
            match = userAgent.match(/Edg\/(\d+\.\d+)/);
        } else if (userAgent.indexOf('Chrome') !== -1) {
            browserName = 'Chrome';
            match = userAgent.match(/Chrome\/(\d+\.\d+)/);
        } else if (userAgent.indexOf('Firefox') !== -1) {
            browserName = 'Firefox';
            match = userAgent.match(/Firefox\/(\d+\.\d+)/);
        } else if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1) {
            browserName = 'Safari';
            match = userAgent.match(/Version\/(\d+\.\d+)/);
        } else if (userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident') !== -1) {
            browserName = 'Internet Explorer';
            match = userAgent.match(/(MSIE \d+\.\d+|rv:\d+\.\d+)/);
        }
        if (match && match[1]) {
            browserVersion = match[1];
        }
        return browserName + ' ' + browserVersion;
    },
    getOperatingSystem: function () {
        var userAgent = navigator.userAgent;
        if (userAgent.indexOf('Win') !== -1) return 'Windows';
        if (userAgent.indexOf('Mac') !== -1) return 'MacOS';
        if (userAgent.indexOf('Linux') !== -1) return 'Linux';
        if (userAgent.indexOf('Android') !== -1) return 'Android';
        if (userAgent.indexOf('like Mac') !== -1) return 'iOS';
        return 'Unknown';
    },
    getPageLoadTime: function () {
        var [navigation] = performance.getEntriesByType("navigation");
        return navigation ? navigation.duration : 0;
    }
};
