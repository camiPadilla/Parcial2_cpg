<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { NivelAcademico } from '@/models/nivel_academico';
import http from '@/plugins/axios'


const ENDPOINT = 'niveles-academicos'
const props = defineProps({
    mostrar: Boolean,
    nivelAcademico: {
        type: Object as () => NivelAcademico,
        default: () => ({}) as NivelAcademico
    },
    modoEdicion : Boolean,
})
const emit = defineEmits(['close', 'guardar'])

const dialogVisible = computed({
    get: () => props.mostrar,
    set: (value) =>{
        if(!value){
            emit('close');
        }
    },
})

const nivelAcademico = ref<NivelAcademico>({...props.nivelAcademico})
watch(
    () => props.nivelAcademico,
    (nuevoValor) => {
        nivelAcademico.value = {...nuevoValor};
    },
)

async function handleSave(){
    try{
        const body={
            nombre: nivelAcademico.value.nombre,
            descripcion: nivelAcademico.value.descripcion,
        }
        if(props.modoEdicion){
            await http.put(`${ENDPOINT}/${nivelAcademico.value.id}`, body)
        } else {
            await http.post(ENDPOINT, body)
        }
    } catch (error) {
        console.error('Error al guardar el nivel académico:', error)
    }
}
</script>
<template>
    <div class="card felx justify-content-center">
    <Dialog header="Nivel Académico" v-model:visible="dialogVisible" :modal="true" :closable="false">
        <div class="p-fluid">
            <div class="field">
                <label for="nombre">Nombre</label>
                <InputText id="nombre" v-model="nivelAcademico.nombre" />
            </div>
            <div class="field">
                <label for="descripcion">Descripción</label>
                <InputTextarea id="descripcion" v-model="nivelAcademico.descripcion" />
            </div>
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" @click="dialogVisible = false" class="p-button-text"/>
            <Button label="Guardar" icon="pi pi-check" @click="handleSave"/>
        </template>
    </Dialog>
    </div>
</template>
<style scoped></style>