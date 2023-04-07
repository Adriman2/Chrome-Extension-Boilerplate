# Chrome Extension Boilerplate with Manifest V3 and Firebase 9

This boilerplate provides a quick and easy way to create a Chrome extension using Manifest V3 and Firebase 9. This is particularly useful since Manifest V3 does not allow you to import Firebase using a CDN. Instead, you will use local Firebase files and interact with them through the background.js using event listeners.

## Example Usage

1. Set up your Firebase project and get your configuration keys.
2. Replace the placeholders [ENTER-YOUR-KEYS] in the firebaseConfig object inside background.js with your actual Firebase configuration keys.
3. Modify the COLLECTION-NAME in background.js to match the desired Firestore collection name.
4. Update the matches property in the manifest.json file to match the target website(s) where your extension will be active.

### Fetch data from Firestore
```
async function fetchData() {
  chrome.runtime.sendMessage({ action: "fetchData" }, (response) => {
    if (response.data) {
      const messages = response.data.messages;
      messages.forEach((message) => {
        console.log(message);
      });
    } else if (response.error) {
      console.error("Error loading data:", response.error);
    }
  });
}
```
### Add data to Firestore
```
function addData(data) {
  chrome.runtime.sendMessage({ action: "addData", data }, (response) => {
    if (response.id) {
      console.log("Data added with ID:", response.id);
    } else if (response.error) {
      console.error("Error adding data:", response.error);
    }
  });
}
```

## Contributions

If you have any suggestions or improvements, please feel free to create a pull request or contact me.

[![Twitter Follow](https://img.shields.io/twitter/follow/AdrianPatziF?style=social)](https://twitter.com/AdrianPatziF)
[![Linkedin](https://img.shields.io/badge/LinkedIn-blue?style=flat-square&logo=linkedin&labelColor=blue&link=https://www.linkedin.com/in/adrian-patzi/)](https://www.linkedin.com/in/adrian-patzi/)


Happy coding!