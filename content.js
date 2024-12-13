// Inject a side panel for category selection
function createSidePanel() {
    const panel = document.createElement('div');
    panel.id = 'custom-youtube-panel';
    panel.style.position = 'fixed';
    panel.style.top = '50px';
    panel.style.right = '0';
    panel.style.width = '300px';
    panel.style.height = 'calc(100% - 50px)';
    panel.style.backgroundColor = '#f9f9f9';
    panel.style.borderLeft = '2px solid #ccc';
    panel.style.zIndex = '10000';
    panel.style.overflowY = 'scroll';
    panel.style.padding = '10px';

    panel.innerHTML = `
        <h3>YouTube Customizer</h3>
        <div>
            <label>Select Categories:</label>
            <select id="categorySelect" multiple style="width: 100%;">
                <option value="music">Music</option>
                <option value="education">Education</option>
                <option value="sports">Sports</option>
                <option value="gaming">Gaming</option>
                <option value="news">News</option>
            </select>
            <button id="applyFilters">Apply Filters</button>
        </div>
        <div>
            <label for="kidFilter">Kids Filter:</label>
            <input type="checkbox" id="kidFilter">
        </div>
        <button id="clearSuggestions">Clear Feed</button>
    `;

    document.body.appendChild(panel);

    // Add event listeners
    document.getElementById('applyFilters').addEventListener('click', applyFilters);
    document.getElementById('clearSuggestions').addEventListener('click', clearFeed);
    document.getElementById('kidFilter').addEventListener('change', toggleKidsFilter);
}

function applyFilters() {
    const selectedCategories = Array.from(
        document.getElementById('categorySelect').selectedOptions
    ).map(option => option.value);

    // Modify suggestions based on selected categories
    console.log('Applying filters:', selectedCategories);
    // Logic to filter feed goes here
}

function clearFeed() {
    const suggestions = document.querySelectorAll('#dismissible');
    suggestions.forEach(video => video.remove());
    console.log('Feed cleared.');
}

function toggleKidsFilter() {
    const isKidsFilterOn = document.getElementById('kidFilter').checked;
    if (isKidsFilterOn) {
        console.log('Kids filter enabled');
        // Logic to hide inappropriate content goes here
    } else {
        console.log('Kids filter disabled');
    }
}

// Add the side panel on page load
window.addEventListener('load', createSidePanel);
