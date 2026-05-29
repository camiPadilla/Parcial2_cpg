<script setup lang="ts">
import type { NivelAcademico } from '@/models/nivel_academico';
import type { Programa } from '@/models/programa';
import http from '@/plugins/axios'
import { InputNumber, Textarea } from 'primevue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'


const ENDPOINT = 'programas'
const props = defineProps({
    mostrar: Boolean,
    programa: {
        type: Object as () => Programa,
        default: () => ({}) as Programa
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

const programa = ref<Programa>({...props.programa})
watch(
    () => props.programa,
    (nuevoValor) => {
        programa.value = {...nuevoValor};
    },
)
const ENDPOINT_NA = 'niveles-academicos'
const niveles_academicos = ref<NivelAcademico[]>([])
const nivelSeleccionado = ref(null)
const estados = [
  { id: 'En Planificacion', nombre: 'En Planificación' },
  { id: 'En Curso', nombre: 'En Curso' },
  { id: 'Finalizado', nombre: 'Finalizado' }
]
const areasConocimiento = [
  { id: 'Derecho', nombre: 'Derecho' },
  { id: 'Educacion', nombre: 'Educación' },
  { id: 'Ingenieria', nombre: 'Ingeniería' },
  { id: 'Salud', nombre: 'Salud' }
]
const estadoSeleccionado = ref(null)

async function obtenerLista(){
    niveles_academicos.value = await http.get(ENDPOINT_NA).then((response: { data: any; }) => response.data)
}
async function handleSave(){
    try{
        const body = {
            nombre: programa.value.nombre,
            descripcion: programa.value.descripcion,
            version: programa.value.version,
            duracion_meses: programa.value.duracion_meses,
            costo: programa.value.costo,
            fecha_inicio: programa.value.fecha_inicio,
            estado: estadoSeleccionado.value,
            id_nivel_academico: nivelSeleccionado.value
        }
        if(props.modoEdicion){
            await http.patch(`${ENDPOINT}/${programa.value.id}`, body)
        }else{
            await http.post(ENDPOINT, body)
        }
        emit('guardar')
        programa.value = {} as Programa;
        dialogVisible.value = false;
    }catch(error: any){
        console.error('Error al guardar el programa:', error);
    }
}
</script>

<template>
    <div class="card flex justify-center">
    <Dialog
        v-model:visible="dialogVisible"
        :header="modoEdicion ? 'Editar programa' : 'Crear programa'"
        style="width: 50rem">
        <div class="flex items-center gap-4 mb-4">
        <Select
        v-model="nivelSeleccionado"
        :options="niveles_academicos"
        optionLabel="nombre"
        optionValue="id"
        placeholder="Seleccione un nivel"
        class="w-full"/>
        </div>
        <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold">Nombre:</label>
        <InputText
            id="nombre"
            v-model="programa.nombre"
            class="flex-auto"
            autocomplete="off"
            autofocus/>
        </div>
        <div class = "flex items-center gap-4 mb-4">
        <label for="descripcion" class="font-semibold">Descripción:</label>
        <Textarea
            id="descripcion"
            v-model="programa.descripcion"
            class="flex-auto"
            autocomplete="off"/>
        </div>
        <div class = "flex items-center gap-4 mb-4">
        <label for="version" class="font-semibold">Versión:</label>
        <InputNumber
            id="version"
            type="number"
            v-model="programa.version"
            class="flex-auto"
            autocomplete="off"
            />
        </div>
        <div class = "flex items-center gap-4 mb-4">
        <label for="duracion_meses" class="font-semibold">Duración (meses):</label>
        <InputNumber
            id="duracion_meses"
            type="number"
            v-model="programa.duracion_meses"
            class="flex-auto"
            autocomplete="off"/>
        </div>
        <div class = "flex items-center gap-4 mb-4">
        <label for="costo" class="font-semibold">Costo:</label>
        <InputNumber
            id="costo"
            type="number"
            v-model="programa.costo"
            class="flex-auto"
            autocomplete="off"/>
        </div>
        <div class = "flex items-center gap-4 mb-4">
        <label for="fecha_inicio" class="font-semibold">Fecha de inicio:</label>
        <InputDate
            id="fecha_inicio"
            type="date"
            v-model="programa.fecha_inicio"
            class="flex-auto"
            autocomplete="off"/>
        </div>
        <div class = "flex items-center gap-4 mb-4">
        <label for="estado" class="font-semibold">Estado:</label>
        <InputText
            id="estado"
            v-model="programa.estado"
            class="flex-auto"
            autocomplete="off"/>
        </div>
        <div class="flex items-center gap-4 mb-4">
        <Select
        v-model="estadoSeleccionado"
        :options="estados"
        optionLabel="nombre"
        optionValue="id"
        placeholder="Seleccione estado"
        class="w-full"
        />
        </div>
        
        <div class = "flex items-center gap-4 mb-4">
        <label for="area_conocimiento" class="font-semibold">Área de conocimiento:</label>
        <Select
            id="area_conocimiento"
            v-model="programa.area_conocimiento"
            :options="areasConocimiento"
            optionLabel="nombre"
            optionValue="id"
            placeholder="Seleccione un área"
            class="w-full"
        />
        </div>
        <div class="flex items-center gap-4 mb-4">
        <Select
        v-model="estadoSeleccionado"
        :options="estados"
        optionLabel="nombre"
        optionValue="id"
        placeholder="Seleccione estado"
        class="w-full"
        />
        </div>

        <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
    </div>
</template>
