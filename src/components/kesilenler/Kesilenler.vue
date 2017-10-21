<template>
    <v-container fluid>
         <v-layout colon wrap>
             <v-flex xs12>
                 <v-card>
                     <v-card-title>
                      {{ this.title }} 
                     <v-spacer></v-spacer>
                     <v-text-field
                         append-icon="search"
                         label="Ara"
                         single-line
                         hide-details
                         v-model="search"        
                     ></v-text-field>
                     </v-card-title>
                     <v-data-table
                         v-bind:headers="headers"
                         v-bind:items="items"
                         v-bind:search="search"
                         v-model="selected"
                         selected-key="RecNo"
                         select-all
                         v-bind:pagination.sync="pagination"
                         class="elevation-1"
                         >
                         <template slot="headerCell" slot-scope="props">         
                              <span>
                            {{ props.header.text }}
                             </span>
                         </template>
                         <template slot="items" slot-scope="props">
                             <td>
                               <v-checkbox
                               primary
                               hide-details
                               v-model="props.selected"
                               ></v-checkbox>
                             </td>
                             <td>{{ props.item.RecNo }}</td>
                             <td  class="text-xs-right">{{ props.item.HayvanAdi }}</td>
                             <td  class="text-xs-right">{{ props.item.SirtNo }}</td>
                             <td  class="text-xs-right">{{ props.item.KulakNumarasi }}</td>
                             <td  class="text-xs-right">{{ props.item.Cinsiyet }}</td>
                             <td  class="text-xs-right">{{ props.item.DogumTarihi | date }}</td>
                             <td  class="text-xs-right">{{ props.item.AciklamaTarihi | date }}</td>
                             <td  class="text-xs-center">{{ props.item.AnneRecNo }}</td>
                         </template>
                     </v-data-table>
                     <div class="text-xs-center pt-2">
                         <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
                     </div>
                 </v-card>
             </v-flex>            
         </v-layout>      
     </v-container>
 </template>
 
 <script>
   export default {
     data () {
       return {
         title: 'Kesilenler',
         search: '',
         pagination: {
           sortBy: 'AciklamaTarihi',
           descending: true
         },
         selected: [],
         headers: [
           { text: 'Rec No', align: 'left', value: 'RecNo' },
           {
             text: 'İsim',
             sortable: false,
             value: 'HayvanAdi'
           },
           { text: 'Sırt No', value: 'SirtNo' },
           { text: 'Kulak No', value: 'KulakNumarasi' },
           { text: 'Cinsiyet', value: 'Cinsiyet' },
           { text: 'Doğum tarihi', value: 'DogumTarihi' },
           { text: 'Kesim tarihi', value: 'AciklamaTarihi' },
           { text: 'Anne Rec No', value: 'AnneRecNo' }
         ]
       }
     },
     computed: {
       items () {
         return this.$store.getters.gYukluKesilenler
       },
       pages () {
         return this.pagination.rowsPerPage ? Math.ceil(this.items.length / this.pagination.rowsPerPage) : 0
       },
       loading () {
         return this.$store.getters.gLoading
       }
     }
   }

 </script>
 