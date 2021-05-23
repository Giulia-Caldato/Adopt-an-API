const picker = document.getElementById("CatImages");
const button = document.getElementById("CatImagesLoader");

button.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});

    chrome.storage.sync.set({ CatImages: picker.value });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundImage,
    });
});

function setPageBackgroundImage() {
    chrome.storage.sync.get( "CatImages", ({ CatImages }) => {
        document.body.style.backgroundImage = CatImages;
    });
}
