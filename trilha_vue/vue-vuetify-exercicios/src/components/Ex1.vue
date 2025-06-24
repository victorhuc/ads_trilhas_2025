<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4">
        <v-card class="pa-2 text-center" outlined>
          Coluna 1
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="pa-2 text-center" outlined>
          Coluna 2
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="pa-2 text-center" outlined>
          Coluna 3
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Ex1',
};
</script>

<style scoped>
.v-card {
  background-color: #e0f2f7; /* Light Blue 50 */
  border: 1px solid #b2ebf2; /* Cyan 100 */
}
</style>