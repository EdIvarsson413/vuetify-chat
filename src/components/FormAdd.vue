<template>
    <v-form class="w-100" @submit.prevent="sendMessage">
        <v-text-field 
            color="white" 
            label="Ingresa el mensaje"
            variant="outlined"
            hide-details
            append-icon="mdi-send"
            @click:append="sendMessage"
            v-model="message"
        >
        </v-text-field>
    </v-form>
</template>

<script setup>
import { addDoc, collection } from '@firebase/firestore';
import { ref } from 'vue'
import { auth, db } from '../firebase'

//Se tiene un mensaje vacio como inicio del camponente
const message = ref('');

const sendMessage = async () => {
    try {
        // Se usa try catch porque el metodo recurre al servidor
        // Se usa el metodo addDoc para agregar un documento que genere su id
        await addDoc(collection(db, 'chats'), {
            // Por mediod de la refrencia se crea un documento con los siguientes campos
            // Mensaje a enviar
            text: message.value,
            
            // Fecha actual
            time: Date.now(),

            //Desde firebase (archivo) se extrae el usuario actual y se extrae su uid
            uid: auth.currentUser.uid,

            // Lo mismo de uid pero para mmostrar el nombre de usuario
            displayName: auth.currentUser.displayName
        })

        //Cuando se envia el mensaje se vacia el input
        message.value = ''
    } catch (error) {
        console.log(error)
    }
}
</script>