import React, { useEffect, useState } from 'react'
import useFirebase from './useFirebase'
import { Database, getDatabase, ref, set, onValue } from 'firebase/database';

const useRealTimeDB = () => {

    const [db, setDb] = useState<Database | undefined>()
    const { app, auth } = useFirebase();

    // function sendMessage(user, message) {
    //     if(db){
    //         set(ref(db, 'messages/' + user), {
    //             user,
    //             message,
    //             timestamp: Date.now(),
    //         });
    //     }
    // }

    // function sendMessage(user, message) {
    //     if(db){
    //         set(ref(db, 'messages/' + user), {
    //             user,
    //             message,
    //             timestamp: Date.now(),
    //         });
    //     }
    // }

    // const receiveMessages = () => {
    //     const messages = ref(db, 'messages/' + postId + '/starCount');
    //     onValue(messages, (snapshot) => {
    //         const data = snapshot.val();
    //         updateStarCount(postElement, data);
    //     });
    // }
    //   function recibirMensajes(callback) {
    //     database.ref('messages').on('child_added', function(snapshot) {
    //       var mensaje = snapshot.val();
    //       callback(mensaje);
    //     });
    //   }

      const getUser = () =>{
        if(auth && db){
        const userId = auth.currentUser?.uid;
        return onValue(ref(db, '/users/' + userId), (snapshot) => {
            const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
            // ...
        }, {
        onlyOnce: true
        });
        }
    }

    useEffect(()=>{
        if(app){
            console.log("app changed")
            // Initialize Realtime Database and get a reference to the service
            const database = getDatabase(app);
            console.log({database})
            setDb(database);
        }
    },[app])

    return { db }
}

export default useRealTimeDB