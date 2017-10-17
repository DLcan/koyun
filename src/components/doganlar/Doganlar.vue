
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
                        selected-key="DogumTarihi"
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
                            <td  class="text-xs-left">{{ props.item.AnaAdi }}</td>
                            <td  class="text-xs-right">{{ props.item.RecNo }}</td>
                            <td  class="text-xs-right">{{ props.item.Cinsiyet }}</td>
                            <td  class="text-xs-right">{{ props.item.SirtNo }}</td>
                            <td  class="text-xs-right">{{ props.item.Tarih | date }}</td>
                            <td  class="text-xs-right">{{ props.item.isim }}</td>

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
        title: 'Yeni Doğanlar',
        search: '',
        pagination: {
          sortBy: 'Tarih'
        },
        selected: [],
        headers: [
          { text: 'Anne Adı', sortable: false, align: 'left', value: 'AnaAdi' },
          { text: 'Rec No', value: 'RecNo' },
          { text: 'Cinsiyet', value: 'Cinsiyet' },
          { text: 'Sırt No', value: 'SirtNo' },
          { text: 'Doğum tarihi', value: 'Tarih' },
          { text: 'İsim', sortable: false, value: 'isim' }
        ]
      }
    },
    computed: {
      items () {
        return this.$store.getters.gYeniDoganlar
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
