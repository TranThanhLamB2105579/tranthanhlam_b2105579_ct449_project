<template>
  <div class="row">
    <div class="mt-3">
      <h4>
        Lịch sử mượn sách
        
      </h4>

      <h5 class="text-success ml-3">
        {{ reader.HoTen }}
      </h5>
      <div class="ml-5">
        <p>
          <span class="font-weight-bold">Email: </span>
          {{ reader.Email }}
        </p>
        <p>
          <span class="font-weight-bold">Số điện thoại: </span>
          {{ reader.DienThoai }}
        </p>
        <p>
          <span class="font-weight-bold">Địa chỉ: </span>
          {{ reader.DiaChi }}
        </p>
      </div>

      

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
import BorrowBookList from '@/components/Reader/BorrowBookList.vue'
import BorrowBookService from '@/services/borrowBook.service'
import ReaderService from '@/services/reader.service'

export default {
  components: {
    BorrowBookList
  },
  //   props: {
  //     id: { type: String, required: true } // Lấy `id` từ `$route.params`
  //   },
  data() {
    return {
      borrowBooks: [],
      activeIndex: -1,
      reader: {}
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
    const id = localStorage.getItem('id')

    if (!id) {
      console.error('Lỗi: ID không tồn tại trong localStorage')
      return
    }

    this.borrowBooks = await BorrowBookService.getAllBorrowBooksByReaderId(id)
  } catch (error) {
    console.log(error)
  }
},

    async getReader(id) {
      try {
        this.reader = await ReaderService.getReaderById(id)
        console.log(this.reader)
      } catch (error) {
        console.log(error)
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: 'notfound',
          params: {
            pathMatch: this.$route.path.split('/').slice(1)
          },
          query: this.$route.query,
          hash: this.$route.hash
        })
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
  created() {
    this.getReader(localStorage.getItem('id'))
  },
  mounted() {
    this.refreshList()
  }
}
</script>

<style>
/* Ảnh nền */
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('/image/background.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -10; /* Đảm bảo nền không che nội dung */
}

/* Lớp phủ giúp làm mờ nền mà không ảnh hưởng đến nội dung */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: -5;
}

/* Đảm bảo nội dung hiển thị trên nền */
.row {
  position: relative;
  z-index: 1;
  background-color: #CFE1B9; /* Giúp nội dung không bị trong suốt */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Tạo hiệu ứng đổ bóng */
}

/* Đảm bảo toàn bộ trang có thể cuộn */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: auto;
}
</style>
