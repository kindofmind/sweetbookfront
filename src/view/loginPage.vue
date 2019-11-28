<template>
  <div class="container-fluid mt-2">
        <h2 class="text-center">Вход</h2>
    <div class="container bg-transparent">
  <b-button v-b-toggle.collapse-2 variant="outline-secondary" class="m-1">Регистрация</b-button>

  <!-- Element to collapse -->
  <b-collapse id="collapse-2">
    <b-card>I am collapsible content!</b-card>
  </b-collapse>
</div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>