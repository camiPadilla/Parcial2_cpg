<script setup lang="ts">
import ProgramaList from '@/components/Programa/ProgramaList.vue'
import { Button } from 'primevue';
import { ref } from 'vue'

const mostrarDialogo = ref(false);
const programaList = ref<typeof ProgramaList | null>(null);
const programaEditar = ref<any>(null);

function handleCreatePrograma(){
   programaEditar.value = null; 
   mostrarDialogo.value = true; 
}
function handleEditPrograma(programa: any){
    programaEditar.value = programa;
    mostrarDialogo.value = true;
}
function handleCloseDialogo(){
    mostrarDialogo.value = false;
}
function handleGuardarPrograma(){
  programaList.value?.obtenerLista();
}
</script>
<template>
  
  <div class="grid">
    <h1 >Programas</h1>
    <div class="grid">
    <Button label="Crear Programa" icon = "pi pi-plus" @click="handleCreatePrograma"/>
    <ProgramaList ref="programaList" @edit="handleEditPrograma" />
    </div>
  </div>
  
</template>

<style scoped></style>
