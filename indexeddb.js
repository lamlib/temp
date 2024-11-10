// Code injected by lamlib
// ───▄▄▄
// ─▄▀░▄░▀▄
// ─█░█▄▀░█
// ─█░▀▄▄▀█▄█▄▀
// ▄▄█▄▄▄▄███▀ Quality assurance then quantity - lamlib with love.

"use strict";
// 1. Mở một cơ sở dữ liệu
function openDatabase ({ database, version = 1, table }) {
    return new Promise((resolve, reject) => {
        let request;
        try {
            request = indexedDB.open(database, version);

            request.onupgradeneeded = function () {
                const db = request.result;
                if (!db.objectStoreNames.contains(table)) {
                    db.createObjectStore(table, { autoIncrement: true });
                    console.info('[lamlib] Upgrade and create new table in database success!');
                } else {
                    console.info('[lamlib] Upgrade database success!');
                }
            };
    
            request.onsuccess = function () {
                console.info("[lamlib] Open database success, let's playing with data!");
                resolve(request.result);
            };
    
            request.onerror = function () {
                throw this.error?.message;
            };
        } catch (error) {
            console.info("[lamlib] Failed to open database!", error.message);
            reject("Failed to open database");
        }


    });
}

// 2. Thêm dữ liệu vào cơ sở dữ liệu
async function addItem({ database, version = 1, table, item }) {
    const db = await openDatabase({ database, version, table});
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(table, "readwrite");
        const store = transaction.objectStore(table);
        const request = store.add(item);

        request.onsuccess = function () {
            console.info("[lamlib] Item added successfully!");
            resolve("Item added successfully!");
        };

        request.onerror = function () {
            console.info("[lamlib] Failed to add item!");
            reject("Failed to add item");
        };
    });
}

// 3. Truy xuất dữ liệu từ cơ sở dữ liệu
async function getItem({ database, version = 1, table, id }) {
    const db = await openDatabase({ database, version, table});
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(table, "readonly");
        const store = transaction.objectStore(table);
        const request = store.get(id);

        request.onsuccess = function () {
            if (request.result) {
                console.info("[lamlib] Item retrieve successfully!");
                resolve(request.result);
            } else {
                console.info("[lamlib] Item not found!");
                reject("Item not found");
            }
        };

        request.onerror = function () {
            console.info("[lamlib] Failed to retrieve item!");
            reject("Failed to retrieve item");
        }
    });
}

// 4. Cập nhập dữ liệu
async function updateItem({ database, version = 1, table, item }) {
    const db = await openDatabase({ database, version, table});
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(table, "readwrite");
        const store = transaction.objectStore(table);
        const request = store.put(item);

        request.onsuccess = function () {
            console.info("[lamlib] Item update successfully!");
            resolve("Item update successfully");
        };

        request.onerror = function () {
            console.info("[lamlib] Failed to update item!");
            reject("Failed to update item");
        }
    });
}

// 5. Xóa dữ liệu
async function deleteItem({ database, version = 1, table, id }) {
    const db = await openDatabase({ database, version, table});
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(table, "readwrite");
        const store = transaction.objectStore(table);
        const request = store.delete(id);

        request.onsuccess = function () {
            console.info("[lamlib] Item delete successfully!");
            reject("Item delete successfully");
        };

        request.onerror = function () {
            console.info("[lamlib] Failed to delete item!");
            reject("Failed to delete item");
        };
    });
}