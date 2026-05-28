<script setup lang="ts">
import { onMounted, ref } from 'vue';
import http from '@/plugins/axios';
import { Dialog } from 'primevue'
import Button from 'primevue/button'
import type { NivelAcademico } from '@/models/nivel_academico';

const ENDPOINT = 'niveles-academicos'
const niveles_academicos = ref<NivelAcademico[]>([])
const nivelAcademicoDelete = ref<NivelAcademico | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const emit = defineEmits(['edit'])

async function obtenerLista(){
    niveles_academicos.value = await http.get(ENDPOINT).then((response: { data: any; }) => response.data)
}

function emitirEdicion(nivelAcademico: NivelAcademico){
    emit('edit', nivelAcademico);
}
function mostrarEliminarConfirm(nivelAcademico: NivelAcademico) {
  nivelAcademicoDelete.value = nivelAcademico
  mostrarConfirmDialog.value = true
}
async function eliminar() {
  await http.delete(`${ENDPOINT}/${nivelAcademicoDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}
onMounted(() => {
    obtenerLista();
})
defineExpose({
    obtenerLista
})
</script>

<template>
    <table>
        <thead>
            <tr>
                <th>Nro.</th>
                <th>Nombre</th>
                <th>Descripción</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(nivelAcademico,index) in niveles_academicos" :key="nivelAcademico.id">
                <td>{{ index + 1 }}</td>
                <td>{{ nivelAcademico.nombre }}</td>
                <td>{{ nivelAcademico.descripcion }}</td>
                <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(nivelAcademico)" />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(nivelAcademico)"
            />
          </td>     
            </tr>
        </tbody>
    </table>
    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
</template>
<style scoped></style>