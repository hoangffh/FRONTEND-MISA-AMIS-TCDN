<template>
    <ul class="pagination">
        <li class="pagination-item">
            <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage"
                aria-label="Go to previous page">
                Trước
            </button>
        </li>

        <li v-for="page in listPages" class="pagination-item" :key="page">
            <button type="button" @click="onClickPage(page.name)" :disabled="page.isDisabled"
                :class="{ active: isPageActive(page.name) }" :aria-label="`Go to page number ${page.name}`">
                {{ page.name }}
            </button>
        </li>

        <li class="pagination-item">
            <button type="button" @click="onClickNextPage" :disabled="isInLastPage" aria-label="Go to next page">
                Sau
            </button>
        </li>
    </ul>
</template>
<script>
export default {
    //tổng bản ghi: 100, 1 page chưa 20 bản ghi => totalPage = 5,
    props: {
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 5
        },
        totalPages: {
            type: Number
        },
        currentPage: {
            type: Number
        },
    },
    watch: {
        currentPage(value) {
            if (value === 1) {
                this.startPage = 1;
            } else if (value === this.totalPages) {
                if(this.totalPages >= this.maxVisibleButtons) {
                    this.startPage = this.totalPages - this.maxVisibleButtons + 1;
                }
            } else 
                if(value < this.totalPages - this.maxVisibleButtons)
                    this.startPage = value - 1; 

            this.endPage = Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);

            this.listPages = []
            for (let i = this.startPage; i <= this.endPage; i += 1) {
                this.listPages.push({
                    name: i,
                    isDisabled: i === this.currentPage
                });
            }
            this.isInFirstPage = value === 1;
            this.isInLastPage = value === this.totalPages;
        },
        totalPages() {
            if (this.currentPage === 1) {
                this.startPage = 1;
            } else if (this.currentPage === this.totalPages) {
                if(this.totalPages >= this.maxVisibleButtons) {
                    this.startPage = this.totalPages - this.maxVisibleButtons + 1;
                }
            } else 
                this.startPage = this.currentPage - 1;

            this.endPage = Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);

            this.listPages = []
            for (let i = this.startPage; i <= this.endPage; i += 1) {
                this.listPages.push({
                    name: i,
                    isDisabled: i === this.currentPage
                });
            }
            this.isInFirstPage = this.currentPage === 1;
            this.isInLastPage = this.currentPage === this.totalPages;
        }
        
    },
    data() { 
        return  {
            listPages: [],
            startPage: 0,
            endPage: 0,
            isInFirstPage: true,
            isInLastPage: false
        }
    },
    
    computed: {
        
    },
    methods: {

        onClickPreviousPage() {
            this.$emit('pagechanged', this.currentPage - 1);
        },
        onClickPage(page) {
            this.$emit('pagechanged', page);
        },
        onClickNextPage() {
            this.$emit('pagechanged', this.currentPage + 1);
        },
        isPageActive(page) {
            return this.currentPage === page;
        },
    }
}
</script>
<style scoped>
.pagination {
    margin: 0 auto;
    padding-left: 0;
    list-style-type: none;
}

.pagination-item {
    display: inline-block;
    padding: 0 2px;
    border: none;
    background-color: none;
}
button{
    border: none;
    background-color: white ;
}

.active {
    color: #000;
    font-weight: bold;
    border: 1px solid #ccc;
}
</style>