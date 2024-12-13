chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ kidsFilter: false, password: null });
    console.log('Extension installed and settings initialized.');
});

// Message listener for password-protected toggle
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'toggleKidsFilter') {
        chrome.storage.sync.get(['password'], (result) => {
            const userPassword = prompt('Enter password:');
            if (userPassword === result.password) {
                chrome.storage.sync.set({ kidsFilter: message.value });
                sendResponse({ success: true });
            } else {
                sendResponse({ success: false });
            }
        });
        return true;
    }
});
