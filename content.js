
//interact with the listeners like this. 

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
  
  function addData(data) {
    chrome.runtime.sendMessage(
      { action: "addData", data },
      (response) => {
        if (response.id) {
          console.log("Data added with ID:", response.id);
        } else if (response.error) {
          console.error("Error adding data:", response.error);
        }
      }
    );
  }