<template>
    <transition name="modal">
        <div v-if="showModal" class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class= "modal-header">
                        <h3>{{ modalTitle }}</h3>
                    </div>
                    <div class="modal-body">
                        <slot name="body">
                            <p>{{ text }}</p>
                            <button id='rightButton'@click.prevent="submit(true)" type="submit" class="btn btn-success">Yes</button>
                            <button id='leftButton'@click.prevent="submit(false)" class="btn btn-danger">No</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'Modal',
        components:{},
        data: function(){
            return {
                showModal: false,
                text: '',
                widthModal: 450,
                modalTitle: ''
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.$bus.$on('open-modal', (title, text) => {
                    this.modalTitle = title;
                    this.text = text;
                    this.showModal = true;
                });
            });
            this.$parent.$on('close-modal', () => {
                this.close();
            });
        },
        methods: {
            close: function(){
                this.showModal = false;
            },

            submit: function (confirm) {
                this.$bus.$emit('confirm', confirm);
                this.close();
            }
        },
    }
</script>

<style scoped>
    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }
    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

    .modal-mask {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      display: table;
      transition: opacity .3s ease;
    }

    .modal-wrapper {
      display: table-cell;
      vertical-align: middle;
    }

    .modal-container {
      width: 400px;
      margin: 0px auto;
      padding: 10px 20px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;
      font-weight: bold;
    }

    .modal-header h3 {
      margin-top: 0;
      color: #42b983;
      font-weight: bold;
      text-align: center;
    }

    .modal-body {
      margin: 10px 0;
      font-weight: bold;
    }

    .modal-default-button-right {
      float: right;
    }

    .modal-default-button-left {
      float: left;
    }

    /*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

    .modal-enter {
      opacity: 0;
    }

    .modal-leave-active {
      opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
    
    



</style>