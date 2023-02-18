<template>
    <v-container class="w-75">
        <v-card
        v-for="item of messages"
        :key="item.id"
        :class="item.uid === userChat.uid && 'ml-auto'"
        :color="item.uid === userChat.uid ? 'red-darken-1' : 'grey-darken-3'"
        class="mb-4"
        width="350"
        height="150"
        >
            <div class="d-flex flex-row justify-space-between">
                <v-card-title>{{ item.displayName }}</v-card-title>
                <v-btn 
                    class="ma-2" 
                    color="red-darken-3" 
                    @click="() => deleteMessage(item.id)"
                    v-if="item.uid === userChat.uid"
                > Borrar 
                </v-btn>
            </div>
            <v-card-text class="text-body-1">{{ item.text }}</v-card-text>
        </v-card>
        <Modal v-if="modal"/>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { db, auth } from '../firebase'
import { collection, query, onSnapshot, orderBy, deleteDoc, doc } from "firebase/firestore";
import Modal from './Modal.vue';

//Se mantiene el modal inactivo
const modal = ref(false);

//La variable mantiene activos los componentes para el usuario actual
const userChat = ref({uid: auth.currentUser.uid});

//Se tiene una lista de mensajes vacia
const messages = ref([]);

//q es una referecia a la consulta que se hará a firestore
const q = query(collection(db, "chats"), orderBy('time'));

//Este es un observador que actualiza la lista de mensajes o avisa de la eliminacion de uno
const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        //Cuando entra un nuevo mensaje a firestore
        if (change.type === "added") {
            //Se actualiza la lista de mensajes
            messages.value.push({
                id: change.doc.id,
                ...change.doc.data()
            });
        }

        //Cuando se elimina un mensaje
        if (change.type === "removed") {
            //Activa el modal que se eliminó un mensaje
            modal.value = true;

            //El modal permanece activo por un segundo
            setTimeout(() => {
                modal.value = false;
            }, 1000)
        }
    });
});

//Metodo que se usa para eliminar un mensaje, requiere de promesas
const deleteMessage = async (id) => {
    try {
            //Se crea la referencia al documento y se guarda en la DB por promesas
            const docRef = doc(db, 'chats', id);
            await deleteDoc(docRef);
        } 
    catch (error) {
            console.log(error);
        } 
    finally{
            //
        }
}
</script>