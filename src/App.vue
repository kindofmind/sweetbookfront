<template>
  <div id="app">
   <b-navbar type="dark" variant="dark" sticky>
    <b-navbar-nav>
   <router-link to="/"> 
             <span class="navbar-brand mb-0 h1">Sweetbook</span>
   </router-link>

  <router-link class="nav-link" to="/addrec"> 
             <span>Добавить рецепт</span>
   </router-link>

    <router-link class="nav-link" to="/login"> 
             <span>Вход</span>
   </router-link>
    </b-navbar-nav>
   </b-navbar>
   <main class="container-fluid">
   <transition name="list">
      <router-view/>
   </transition>

   </main>
  </div>
</template>

<style>
.list-enter-active {
  transition: all .5s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
