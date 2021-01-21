<template>
    <div class="sys-title">
        <strong>{{title}}</strong>
    </div>
</template>

<script>
    export default {
        name: 'AppTitle',
        data() {
            return {
                title: ""
            }
        },
        mounted() {
            this.title = ""
            this.$store.state.MenuList.forEach((item) => {
                if (this.$route.path == item.path) {
                    this.title = item.name
                }
            })
        }
    }
</script>