import { initializeApp, firestore, analytics } from 'firebase'
initializeApp({ 
    apiKey: "AIzaSyAEAVBnoi2ZCDXe2OkLLNEZjK7ibCyxE4A",
    authDomain: "keep-3fbbc.firebaseapp.com",
    databaseURL: "https://keep-3fbbc.firebaseio.com",
    projectId: "keep-3fbbc",
    storageBucket: "keep-3fbbc.appspot.com",
    messagingSenderId: "738489463868",
    appId: "1:738489463868:web:973f807521a2e9a8623f39",
    measurementId: "G-PW9KQDQEFR"
});
analytics()
var db = firestore();

export default {
    namespaced: true,
    state: {
        notes: []
    },
    getters: {
    },
    mutations: {
        ADD_NOTE(state, note){
            state.notes.push(note)   
        }
    },
    actions: {
        async fetchNotes({ commit }){
            let notesSnapShot = await db.collection('notes').get()
            notesSnapShot.forEach(note => {
                commit('ADD_NOTE', {
                    id : note.id,
                    ...note.data()
                })
            })
        },
        async addNote({ commit }, note){
            let noteRef = await db.collection('notes').add({
                title: note.title,
                note: note.note
            })
            note.if = noteRef.id
            console.log(noteRef)
            commit('ADD_NOTE', note)
        }
    },
}