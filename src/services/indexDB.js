// indexedDB.js

const dbName = "myDatabase";
const dbVersion = 1;

const openRequest = indexedDB.open(dbName, dbVersion);

openRequest.onupgradeneeded = function (event) {
  const db = event.target.result;
  if (!db.objectStoreNames.contains("myObjectStore")) {
    db.createObjectStore("myObjectStore", { autoIncrement: true });
  }
};

openRequest.onsuccess = function (event) {
  const db = event.target.result;

  // You can export 'db' or use it within this module to perform operations.
};

openRequest.onerror = function (event) {
  console.error("Error opening database", event.target.error);
};

export default openRequest;
