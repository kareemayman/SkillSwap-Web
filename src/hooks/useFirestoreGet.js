import { useState, useCallback, useRef, useEffect } from "react";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

/**
 * A custom hook for making Firestore requests manually.
 *
 * @param {Object} options - Configuration options for the hook.
 * @param {boolean} [options.initialLoading=false] - Whether the hook should start in a loading state.
 *
 * @returns {{
 * data: any,
 * error: Error | null,
 * loading: boolean,
 * request: (collectionName: string, docId?: string, queryOptions?: object) => Promise<void>
 * }} An object containing the request state and the request function.
 */
export default function useFirestoreGet({ initialLoading = false } = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(initialLoading);

  // Use a ref to track if the component is mounted
  const isMountedRef = useRef(false);

  // The main request function, wrapped in useCallback for performance
  const request = useCallback(async (collectionName, docId = null, queryOptions = null) => {
    // console.log(
    //   `@useFirestoreGet @request ---- request function called with args ---- collectionName = ${collectionName} ---- docId = ${docId} ---- queryOptions = ${queryOptions}`
    // );

    if (!collectionName) {
      if (isMountedRef.current) {
        setError(new Error("Collection name is required"));
      }
      return;
    }

    if (isMountedRef.current) {
      setLoading(true);
      setError(null);
      setData(null); // Reset previous data
    }

    try {
      let result;

      if (docId) {
        // Fetch single document
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);

        // console.log(
        //   `@useFirestoreGet @request ---- there is docId = ${docId} ---- docSnap.exists() = ${docSnap.exists()} ---- docRef = `,
        //   docRef,
        //   " ---- docSnap =",
        //   docSnap
        // );

        if (docSnap.exists()) {
          result = { id: docSnap.id, ...docSnap.data() };

          // console.log(`@useFirestoreGet @request ---- docSnap.exists() = ${docSnap.exists()} ---- result = `, JSON.stringify(result));
        } else {
          console.error(`@useFirestoreGet @request ---- will throw new Error("Document not found")`);
          throw new Error("Document not found");
        }
      } else if (queryOptions) {
        // Fetch with query
        const q = query(collection(db, collectionName), where(queryOptions.field, queryOptions.operator, queryOptions.value));
        const querySnapshot = await getDocs(q);
        result = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } else {
        // Fetch all documents in collection
        const querySnapshot = await getDocs(collection(db, collectionName));
        result = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      }

      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setData(result);
        setLoading(false);
      }
    } catch (err) {
      console.error(
        `@useFirestoreGet @request ---- error was caught in try/catch block ---- err = `,
        err,
        " ---- isMountedRef.current =",
        isMountedRef.current
      );

      if (isMountedRef.current) {
        setError(err);
        setLoading(false);
      }
    }
  }, []);

  // useEffect for cleanup. This will run when the component unmounts.
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      // console.log("@useFirestoreGet ---- cleanup function was called");
      isMountedRef.current = false;
    };
  }, []);

  return { data, error, loading, request };
}
