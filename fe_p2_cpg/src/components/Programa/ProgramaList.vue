<script setup lang="ts">
import type { Programa } from '@/models/programa';
import { onMounted, ref } from 'vue';
import http from '@/plugins/axios';

    const ENDPOINT = 'programas'
    const programas = ref<Programa[]>([])
    const emit = defineEmits(['edit'])

    async function obtenerLista(){
        programas.value = await http.get(ENDPOINT).then(response => response.data)
    }
    function emitirEdicion(programa: Programa){
        emit('edit', programa);
    }
    async function eliminar(id: number){
        if(confirm('¿Está seguro de eliminar este programa?')){
            await http.delete(`${ENDPOINT}/${id}`)
            obtenerLista()
        }
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
                <th>Nro. nivel académico</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Version</th>
                <th>Duración meses</th>
                <th>Costo</th>
                <th>Fecha inicio</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(programa,index) in programas" :key="programa.id">
                <td>{{ index + 1 }}</td>
                <td>{{ programa.nivelAcademico.nombre }}</td>
                <td>{{ programa.nombre }}</td>
                <td>{{ programa.descripcion }}</td>
                <td>{{ programa.version }}</td>
                <td>{{ programa.duracion_meses }}</td>
                <td>{{ programa.costo }}</td>
                <td>{{ programa.fecha_inicio }}</td>
                <td>{{ programa.estado }}</td>
                <td>
                    <button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(programa)"></button>
                    <button icon="pi pi-trash" aria-label="Eliminar" text @click="eliminar(programa.id)"></button>
                </td>        
            </tr>
        </tbody>
    </table>
</template>
<style scoped></style>