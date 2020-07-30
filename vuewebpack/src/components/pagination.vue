<template>
    <div>
        
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{'disable' : !pages.has_pre}" @click="changepage(pages.current_page-1)">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li class="page-item" v-for="page in pages.total_pages" :key="page"><a class="page-link" href="#" @click.prevent="changepage(page)">{{ page }}</a></li>
                
                <li class="page-item" :class="{'disable' : !pages.has_next}" @click="changepage(pages.current_page+1)">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
        </nav>
    </div>
</template>        

<script>
export default {
    
    props:[
        'pages'
    ],
    
    methods:{
        changepage(page){
            this.$emit('changedpage',page);
        }
    }
}
</script>
