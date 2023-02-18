<template>
  <v-app>
    <div v-if="userGoogle === false">
      Loading...
    </div>

    <v-app-bar color="error" v-if="userGoogle !== false">
      <v-app-bar-title>VuetifyChat</v-app-bar-title>
      <v-btn 
        prepend-icon="mdi-login-variant" 
        variant="outlined"
        @click="googleAccess"
        v-if="!userGoogle"
      > Acceder </v-btn>
      <v-btn 
        prepend-icon="mdi-login-variant" 
        variant="outlined"
        @click="logout"
        v-if="userGoogle"
      > Salir </v-btn>
    </v-app-bar>

    <v-main app class="bg-grey-darken-4">
      <v-container>
        <Chat v-if="userGoogle"/>
        <div v-else> <h1 class="text-h2 text-center mt-10" >Debes iniciar sesion :D</h1> </div>
      </v-container>
    </v-main>

    <v-footer class="bg-error" app v-if="userGoogle">
      <FormAdd/>
    </v-footer>
  </v-app>
</template>

<script setup>
import { auth } from './firebase'
import { ref } from 'vue';
import {  signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import Chat from './components/Chat.vue'
import FormAdd from './components/FormAdd.vue'

const userGoogle = ref(false);

//Este metodo permitirá hacer login con una cuenta de Google por medio de una ventana emergente
const googleAccess = async() => {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider); // Por destructuracion se extrae los datos del usuario
    //console.log(user)
  } catch (error) {
    console.log(error);
  }
}

//Este es un observador que mantiene la sesion inciada
onAuthStateChanged(auth, user => {
  //La variable permitira la visualizacion de los camponentes
  userGoogle.value = user;
})

//Metodo en forma de promesa para cerrar sesion
const logout = async () => {
  await signOut(auth);
}
</script>