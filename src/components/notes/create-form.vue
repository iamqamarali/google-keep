<template>
    <div class="create-note">
        <div class="backdrop" @click="showTitle = false" v-if="showTitle"></div>
        <form ref="form">
            <input type="text" placeholder="Title" class=" " v-if="showTitle" v-model="note.title">
            <textarea name="" placeholder="Take a note..." class=" " @focus="showTitle = true" v-model="note.note"></textarea>
            <button type="button"  @click="addNote">+</button>
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
                this.showTitle = false
            }
        },
    }
</script>
