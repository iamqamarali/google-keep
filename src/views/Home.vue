<template>
  <div class="home"> 
    <div class="container-fluid">
        <Logos></Logos>
        <create-form></create-form>
        <div v-for="(note, index) in notes" :key="index">
          <note :note="note" ></note>
        </div>
    </div>
  </div>
</template>

<script>
import Logos from '@/components/logos.vue'
import CreateForm from '@/components/notes/create-form.vue'
import Note from '@/components/notes/note.vue'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    Logos,
    CreateForm,
    Note
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
      })
  }

}
</script>
