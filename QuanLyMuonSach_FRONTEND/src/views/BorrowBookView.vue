<template>
  <div class="row">
    <div class="mt-3">
      <h4>
        Danh sách lượt Mượn sách
        
      </h4>

     

      <BorrowBookList
        v-if="filteredBorrowBooksCount > 0"
        :borrowBooks="filteredBorrowBooks"
        v-model:activeIndex="activeIndex"
        @bookReturned="handleBookReturned"
      />
      <p v-else>Không có lượt Mượn sách nào.</p>
    </div>
  </div>
</template>

<script>
import BorrowBookList from '@/components/BorrowBookList.vue'
import BorrowBookService from '@/services/borrowBook.service'

export default {
  components: {
    BorrowBookList
  },
  data() {
    return {
      borrowBooks: [],
      activeIndex: -1
    }
  },
  watch: {},
  computed: {
    borrowBookStrings() {
      return this.borrowBooks.map((borrowBook) => {
        const { TenNXB, DiaChi } = borrowBook
        return [TenNXB, DiaChi].join('')
      })
    },
    // Tra ve cac Contact co chua thong tin can tim kiem:
    filteredBorrowBooks() {
      return this.borrowBooks
    },
    activeBorrowBook() {
      if (this.activeIndex < 0) return null
      return this.filteredBorrowBooks[this.activeIndex]
    },
    filteredBorrowBooksCount() {
      return this.filteredBorrowBooks.length
    }
  },
  methods: {
    async retrieveBorrowBooks() {
      try {
        this.borrowBooks = await BorrowBookService.getAllBorrowBooks()
      } catch (error) {
        console.log(error)
      }
    },
    refreshList() {
      this.retrieveBorrowBooks()
      this.activeIndex = -1
    },
    goToAddBorrowBook() {
      this.$router.push({
        name: 'borrowBook.add'
      })
    },
    handleBookReturned(borrowBook) {
      alert(
        `Sách "${borrowBook.Sach.TenSach}" đã được trả bởi Độc giả "${borrowBook.DocGia.HoTen}"`
      )
      // Refresh the list
      this.refreshList()
    }
  },
  mounted() {
    this.refreshList()
  }
}
</script>

<style>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
