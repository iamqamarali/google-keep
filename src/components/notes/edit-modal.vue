<template>
    <transition
        v-on:enter="enter"

        v-on:leave="leave"
        >    
        <div class="edit-modal" v-if="isShown">
            <div class="backdrop" @click="close"></div>
            <div class="modal" >
                <form @submit="updateNote($event)" class="edit-form" >
                    <input type="text" v-model="editNote.title" placeholder="Title">
                    <textarea placeholder="Take a note..." v-model="editNote.note" ></textarea>

                    <footer class="modal-footer">
                        <button type="button" class="delete-button" @click="deleteNote"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg></button>
                        <button type="submit" class="submit-button"><span>Done</span></button>
                    </footer>
                </form>
            </div>
        </div>
    </transition>
</template>
<script>
import anime from 'animejs'
export default {
    props: {
        isShown:{
            type: Boolean,
            required: true
        },
        note:{
            default: {}
        }
    },
    data(){
        return {
            editNote: {
                id: '',
                title: '',
                note: ''
            }
        }
    },
    methods: {
        close(){
            this.$emit('close');
        },
        updateNote(e){
            e.preventDefault()
            this.$store.dispatch('notes/updateNote', this.editNote)
            this.close()
        },
        deleteNote(){
            let ans = confirm('Do you really want to delete this note')
            if(ans){
                this.$store.dispatch('notes/deleteNote', this.editNote.id)
                this.close();                
            }
        },

        // animation methods
        // --------
        // ENTERING
        // --------

        // the done callback is optional when
        // used in combination with CSS
        enter: function (el, done) {
            anime({
                targets: '.edit-modal .edit-form',
                opacity: 0,
                scale: .7,
                duration: 0,
                complete(){
                    anime({
                        targets: '.edit-modal .edit-form',
                        opacity: 1,
                        scale: 1,
                        duration: 200,
                        easing: 'easeInOutQuint',
                        complete: ()=>{
                            done()
                        }
                    })
                }
            })
        },

        // the done callback is optional when
        // used in combination with CSS
        leave: function (el, done) {
            anime({
                targets: '.edit-modal .edit-form',
                opacity: 0,
                scale: .7,
                duration: 200,
                easing: 'linear',
                complete(){
                    done()
                }
            })
        },
    },
    watch:{
        isShown(value){
            if(value){
                this.editNote = {
                    id: this.note.id,
                    title: this.note.title,
                    note: this.note.note
                }
            }
        }
    }
}
</script>

