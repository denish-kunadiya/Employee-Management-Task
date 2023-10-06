const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

export const insertDataInIndexedDb = () => {
  //check for support
  if (!idb) {
    alert("This browser doesn't support IndexedDB");
    return;
  }

  const request = idb.open("Employee", 1);

  request.onerror = function (event) {
    alert("An error occurred with IndexedDB");
    console.error(event);
  };

  request.onupgradeneeded = function (event) {
    const db = request.result;

    if (!db.objectStoreNames.contains("userData")) {
      db.createObjectStore("userData", { keyPath: "id" });
    }
  };

  request.onsuccess = function () {
    console.log("Database opened successfully");

    const db = request.result;

    var tx = db.transaction("userData", "readwrite");
    tx.objectStore("userData");

    // USER_DATA.forEach((item) => userData.add(item));

    return tx.complete;
  };
};
