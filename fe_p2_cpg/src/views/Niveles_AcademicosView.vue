<script lang="ts" setup>
import NivelesAcademicosSave from '@/components/Niveles_Academicos/NivelesAcademicosSave.vue'
import NivelesAcademicosList from '@/components/Niveles_Academicos/NivelesAcademicosList.vue'
import { ref } from 'vue';
import { Button } from 'primevue';

const mostrarDialogo = ref(false);
const niveles_academicosList = ref<typeof NivelesAcademicosList | null>(null);
const nivelAcademicoEditar = ref<any>(null);

function handleCreateNivelAcademico(){
   nivelAcademicoEditar.value = null; 
   mostrarDialogo.value = true; 
}
function handleEditNivelAcademico(nivelAcademico: any){
    nivelAcademicoEditar.value = nivelAcademico;
    mostrarDialogo.value = true;
}
function handleCloseDialogo(){
    mostrarDialogo.value = false;
}
function handleGuardarNivelAcademico(){
  niveles_academicosList.value?.obtenerLista();
}
</script>

<template>
    <div class="grid">
    <h1>Niveles Académicos</h1>
    <div class="grid">
    <Button label="Crear nivel academico" icon = "pi pi-plus" @click="handleCreateNivelAcademico"/>
    <NivelesAcademicosList ref="niveles_academicosList" @edit="handleEditNivelAcademico" />
    <NivelesAcademicosSave
      :mostrar="mostrarDialogo"
      :nivelAcademico="nivelAcademicoEditar"
      :modoEdicion="!!nivelAcademicoEditar"
      @guardar="handleGuardarNivelAcademico"
      @close="handleCloseDialogo"
    />
    </div>
    </div>
</template>
<style scoped></style>