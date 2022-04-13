<template>
    <div id="app-component">
       <div class="row" style="margin-top: 10px;">
           <div class="container" style="background-color: rgb(22, 26, 30); color: white;">
               <div class="col-md-12"></div>
               <div class="col-xs-6">
                   <h2 style="text-align: center;">Buy</h2>
                   <hr>
                   <div>
                       <div class="col-xs-6 text-left"><b>Size</b></div>
                       <div class="col-xs-6 text-right"><b>Bid</b></div>
                   </div>
                   <div v-for="(item, index) in dataBuy" :key="index">
                       <div class="col-xs-6 text-left">{{item.size}}</div>
                       <div class="col-xs-6 text-right" style="color: red;">{{item.price}}</div>
                   </div>
                   <div style="font-size: 18px" v-if="dataBuy.length">
                       <div class="col-xs-6 text-left"><b>Total</b></div>
                       <div class="col-xs-6 text-right"><b>{{totalBuy}}</b></div>
                   </div>
               </div>
               <div class="col-xs-6">
                   <h2 style="text-align: center;">Sell</h2>
                   <hr>
                   <div>
                       <div class="col-xs-6 text-left"><b>Ask</b></div>
                       <div class="col-xs-6 text-right"><b>Size</b></div>
                   </div>
                   <div v-for="(item, index) in dataSell" :key="index">
                       <div class="col-xs-6 text-left" style="color: rgb(14, 203, 129);">{{item.price}}</div>
                       <div class="col-xs-6 text-right">{{item.size}}</div>
                   </div>
                   <div style="font-size: 18px" v-if="dataSell.length">
                       <div class="col-xs-6 text-left"><b>Total</b></div>
                       <div class="col-xs-6 text-right"><b>{{totalSell}}</b></div>
                   </div>

               </div>
           </div>
       </div>
    </div>
</template>

<script>
 import axios from './client'
 import config from './config'
 import io from "socket.io-client";
 import { mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {},
  data () {
    return {
      dataBuy: [],
      dataSell: []
    }
  },
  computed: {
    totalBuy() {
      let total = 0
      this.dataBuy.forEach(item => {
        total += Number(item.price) * Number(item.size)
      })
      return total.toFixed(8)
    },
    totalSell() {
      let total = 0
      this.dataSell.forEach(item => {
        total += Number(item.size)
    })
      return total.toFixed(8)
    }
  },
  mounted () {
    this.initData()
    this.initSocket()
  },
  destroyed () {},
  methods: {
    async initData() {
      try {
        let response = await axios.get('/get-data')
        let data = response.data.data
        this.convertData(data)
      } catch (e) {
        console.log(e)
      }
    },
    initSocket() {
       const socket = io(config.SERVER_URL, { transports: ["websocket"] });
       socket.on("connect", () => {
         console.log('Connected Socket')
     });
       socket.on("get-data", (data) => {
         if (data) {
           this.convertData(data)
         }
     });
    },
    convertData(data) {
       if (data) {
         this.dataBuy = data.buy
         this.dataSell = data.sell
       } else {
         this.dataBuy = []
         this.dataSell = []
       }
    }
  }
}
</script>
<style scoped></style>
