var firebase = require( 'firebase' );

const firebaseConfig = {
    apiKey: "AIzaSyDQxMSd02yG1HiN5_SRVcQ4Iwq3Li77bWM",
    authDomain: "social-media-e2f0a.firebaseapp.com",
    databaseURL: "https://social-media-e2f0a.firebaseio.com",
    projectId: "social-media-e2f0a",
    storageBucket: "social-media-e2f0a.appspot.com",
    messagingSenderId: "557362853120",
    appId: "1:557362853120:web:9f32f75e26dc38b669efe5",
    measurementId: "G-KD6BZ9LQ02"
};

let fireDb = firebase.initializeApp( firebaseConfig );

export const db = fireDb.firestore();


export const loginUser = async ( username,password ) => {
    let email = `${ username }@mail.com`;
    try {
        const res = await firebase.auth().signInWithEmailAndPassword( email,password );
        console.log( res );
        return res;
    } catch ( error ) {
        console.log( error );
        return error;
    }
}

export const signupUser = async ( username,password ) => {
    let email = `${ username }@mail.com`;
    try {
        const res = await firebase.auth().createUserWithEmailAndPassword( email,password );
        return res;
    } catch ( error ) {
        console.log( error );
        return error;
    }
}

export default fireDb.database().ref();
