<template>
    <div class="create-note-form">
        <div class="backdrop" @focus="showTitle = false" v-if="showTitle"></div>
        <form ref="form">
            <input type="text" placeholder="Title" class="form-control" v-if="showTitle" v-model="note.title">
            <textarea name="" placeholder="Take a note..." class="form-control" @focus="showTitle = true" v-model="note.note"></textarea>
            <button type="button" @click="addNote">+</button>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: 'create-form',
        data(){
            return {
                note:{
                    title: '',
                    note: ''
                },
                showTitle: false
            }
        },
        methods:{
            ...mapActions([
                'notes/addNote'
            ]),
            addNote(){
                this.$store.dispatch('notes/addNote', this.note);
                this.$refs.form.reset()
                this.note = {
                    title: '',
                    note: ''
                }                
            }
        },
    }
</script>
