"use client";
import { firebaseConfig, firebaseStroageURL } from '@/utils';
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { createUniqueFileName } from '@/helpers/createUniqueFileName';

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);


export const helperForUPloadingImageToFirebase = async (file, progressCallback) => {
    const getFileName = createUniqueFileName(file)
    const storageReference = ref(storage, `ecommerce/${getFileName}`);
    const uploadImage = uploadBytesResumable(storageReference, file);
  
    return new Promise((resolve, reject) => {
      uploadImage.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progressCallback(progress);
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref)
            .then((downloadUrl) => resolve(downloadUrl))
            .catch((error) => reject(error));
        }
      );
    });
  }