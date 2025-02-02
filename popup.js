document.addEventListener("DOMContentLoaded", () => {
    const keywordInput = document.getElementById("keyword");
    const addKeywordBtn = document.getElementById("addKeyword");
    const suggestedKeywords = document.getElementById("suggestedKeywords");
    const toggleKidsLock = document.getElementById("toggleKidsLock");
    const passwordSection = document.getElementById("passwordSection");
    const submitPasswordBtn = document.getElementById("submitPassword");
    const passwordInput = document.getElementById("password");
    const toggleIndicator = document.getElementById("toggleIndicator");

    // Dynamic list of keywords
    const keywords = [];

    // Add Keyword
    addKeywordBtn.addEventListener("click", () => {
        const keyword = keywordInput.value.trim();
        if (keyword) {
            keywords.push(keyword);
            const listItem = document.createElement("li");
            listItem.textContent = keyword;
            suggestedKeywords.appendChild(listItem);
            keywordInput.value = "";
        } else {
            alert("Please enter a valid keyword.");
        }
    });

    // Handle Kids Lock Toggle
    let kidsLockEnabled = false;

    chrome.storage.sync.get(['kidsFilter'], (result) => {
        kidsLockEnabled = result.kidsFilter;
        updateKidsLockUI();
    });

    toggleKidsLock.addEventListener("click", () => {
        kidsLockEnabled = !kidsLockEnabled;
        chrome.storage.sync.set({ kidsFilter: kidsLockEnabled }, () => {
            updateKidsLockUI();
        });
    });

    function updateKidsLockUI() {
        toggleKidsLock.setAttribute("data-enabled", kidsLockEnabled);
        if (kidsLockEnabled) {
            toggleKidsLock.classList.replace("bg-gray-300", "bg-blue-500");
            toggleIndicator.classList.add("translate-x-6");
            passwordSection.classList.remove("hidden");
        } else {
            toggleKidsLock.classList.replace("bg-blue-500", "bg-gray-300");
            toggleIndicator.classList.remove("translate-x-6");
            passwordSection.classList.add("hidden");
        }
    }

    // Handle Password Submission
    submitPasswordBtn.addEventListener("click", () => {
        const password = passwordInput.value.trim();
        if (!password) {
            alert("Please enter a password.");
            return;
        }

        chrome.storage.sync.set({ password }, () => {
            alert("Password saved.");
            passwordInput.value = "";
        });
    });
});
