import { useState, useEffect } from "react";
import {
  db,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "../firebase/configNew";

const useFirestore = (collect) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    // const querySnapshot = getDocs(collection(db, collection));
    // const unsub = onSnapshot(doc(db, collection), (doc) => {
    //   console.log("Current data: ", doc.data());
    // });
    // let documents = [];
    // unsub.forEach((doc) => {
    //   documents.push({ ...doc.data(), id: doc.id });
    // });
    // setDocs(documents);

    const q = query(collection(db, collect), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      let documents = [];
      snapshot.docs.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
      // console.log(documents);
    });

    return () => unsub();
  }, [collect]);

  return { docs };
};

export default useFirestore;
