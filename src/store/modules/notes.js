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
            state.notes.splice(0, 0, note)
        },
        UPDATE_NOTE(state, note){
            let index = 0;
            for(index = 0 ; index < state.notes.length; index++){
                if(state.notes[index].id == note.id ){
                    break
                }
            }
            state.notes.splice(index, 1, note)
        },        
        DELETE_NOTE(state, id){
            let index = 0;
            for(index = 0 ; index < state.notes.length; index++){
                if(state.notes[index].id == id ){
                    break
                }
            }
            state.notes.splice(index, 1)
        },        
    },
    actions: {
        async fetchNotes({ commit, state }){
            let notesSnapShot = await db.collection('notes').orderBy('created_at', 'desc').get()
            notesSnapShot.forEach(note => {
                state.notes.push({
                    id : note.id,
                    ...note.data()
                })
            })
        },
        async addNote({ commit }, note){
            let noteRef = await db.collection('notes').add({
                title: note.title,
                note: note.note,
                created_at: new Date()
            })
            note.id = noteRef.id
            commit('ADD_NOTE', note)
        },
        async updateNote({ commit }, note){
           db.collection('notes').doc(note.id)
            .update({
                title: note.title,
                note: note.note
            })
            commit('UPDATE_NOTE', note);
        },
        async deleteNote({ commit }, id){
            db.collection('notes').doc(id).delete()

            commit('DELETE_NOTE', id);
        }
    },
}