<template>
  <div class="home"> 
    <div class="container-fluid">
        <Logos></Logos>
        <CreateForm></CreateForm>
        <div class="notes" >
          <Note :note="note" v-for="(note, index) in notes" :key="index" @click="openEditModal(note)" ></Note>
        </div>
    </div>
    <EditModal :isShown="editModal.show" @close="editModal.show = false" :note="editModal.note" ></EditModal>
  </div>
</template>

<script>
import Logos from '@/components/logos.vue'
import CreateForm from '@/components/notes/create-form.vue'
import Note from '@/components/notes/note.vue'
import EditModal from '@/components/notes/edit-modal.vue'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    Logos,
    CreateForm,
    Note,
    EditModal
  },
  data(){
    return {
      editModal: {
        show: false,
        note: {}
      }
    }
  },
  created(){
    this.fetchNotes()
  },
  computed : {
      ...mapState({
          notes: (state) => state.notes.notes
      })
  },
  methods:{
      ...mapActions({
        fetchNotes: 'notes/fetchNotes'
      }),
      openEditModal(note){
        this.editModal.show = true
        this.editModal.note = note
      }
  }

}
</script>
