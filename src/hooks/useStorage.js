import { useState, useEffect } from "react";
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  db,
  collection,
  addDoc,
  serverTimestamp,
} from "../firebase/configNew";

const useStorage = (file) => {
  // console.log({ storage });
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    // const storageRef = storage.ref(file.name);
    const storageRef = ref(storage, file.name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // storageRef.put(file).on(
    //   "state_changed",
    //   (snap) => {
    //     let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
    //     setProgress(percentage);
    //   },
    //   (err) => {
    //     setError(err);
    //   },
    //   async () => {
    //     const url = await storageRef.getDownloadURL();
    //     setUrl(url);
    //   }
    // );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // let percentage =
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // setProgress(percentage);
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (err) => {
        setError(err);
      },
      () => {
        // const url = await storageRef.getDownloadURL();
        // setUrl(url);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
          console.log("File available at", downloadURL);
          const docRef = addDoc(collection(db, "images"), {
            url: downloadURL,
            createdAt: serverTimestamp(),
          });
          console.log("Document written with ID: ", docRef.id);
        });
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
