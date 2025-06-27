import CryptoJS from 'crypto-js';
const secretKey = 'secret-key-123';
// Encrypt data
export const encryptData = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return encryptedData;
};

// Decrypt data
export const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

// Save encrypted data to localStorage
export const saveToLocalStorage = (key, data) => {
  const encryptedData = encryptData(data, secretKey);
  localStorage.setItem(key, encryptedData);
};

// Get encrypted data from localStorage
export const getFromLocalStorage = (key) => {
  const encryptedData = localStorage.getItem(key);
  if (encryptedData) {
    return decryptData(encryptedData, secretKey);
  }
  return null;
};
