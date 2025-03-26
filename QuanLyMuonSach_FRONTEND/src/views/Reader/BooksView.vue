<template>
  <div>
    <!-- Ảnh nền -->
    <div class="background"></div>
    <div class="overlay"></div>

    <!-- Nội dung trang web -->
    <div class="content">
      <div class="row">
        <div class="col-md-11">
          <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3">
          <h4>Mượn sách</h4>
          
          <BookList
            v-if="filteredBooksCount > 0"
            :books="filteredBooks"
            v-model:activeIndex="activeIndex"
            @refresh-list="refreshList"
          />
          <p v-else>Không có Sách nào.</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// import BookCard from '@/components/BookCard.vue'
import BookList from '@/components/Reader/BookList.vue'
import InputSearch from '@/components/InputSearch.vue'
import BookService from '@/services/book.service'

export default {
  components: {
    InputSearch,
    BookList
  },
  data() {
    return {
      books: [],
      activeIndex: -1,
      searchText: ''
    }
  },
  watch: {
    // Giam sat cac thay doi cua bien searchText.
    // Bo chon phan tu dang duoc chon trong danh sach
    searchText() {
      this.activeIndex = -1
    }
  },
  computed: {
    // Chuyen cac doi tuong Contact thanh chuoi de tien cho tim kiem:
    bookStrings() {
      return this.books.map((book) => {
        const { TenSach, TacGia, DonGia, SoQuyen, NamXuatBan, HinhAnh, NhaXuatBan } = book
        return [TenSach, TacGia, DonGia, SoQuyen, NamXuatBan, HinhAnh, NhaXuatBan].join('')
      })
    },
    // Tra ve cac Contact co chua thong tin can tim kiem:
    filteredBooks() {
      if (!this.searchText) {
        return this.books
      }
      return this.books.filter((book, index) => this.bookStrings[index].includes(this.searchText))
    },
    activeBook() {
      if (this.activeIndex < 0) return null
      console.log('Clicked')
      return this.filteredBooks[this.activeIndex]
    },
    filteredBooksCount() {
      return this.filteredBooks.length
    }
  },
  methods: {
    async retrieveBooks() {
      try {
        this.books = await BookService.getAllBooks()
      } catch (error) {
        console.log(error)
      }
    },
    refreshList() {
      this.retrieveBooks()
      this.activeIndex = -1
    },
    goToAddBook() {
      this.$router.push({
        name: 'book.add'
      })
    }
  },
  mounted() {
    this.refreshList()
  }
}
</script>

<style>
/* Đảm bảo toàn bộ trang có thể cuộn */
/* Đảm bảo toàn bộ trang có thể cuộn */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: auto;
}

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
  filter: blur(5px); /* Chỉ làm mờ ảnh nền */
  z-index: -10; /* Đưa nền xuống dưới */
}

/* Lớp phủ giúp giữ hiệu ứng mờ đồng nhất */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.2); /* Giảm độ mờ để không che nội dung */
  z-index: -5;
}

/* Nội dung chính */
.content {
  position: relative;
  z-index: 1;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #BDD1C5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* Đảm bảo nội dung có thể cuộn */
.container {
  min-height: 100vh;
  overflow-y: auto; /* Bật thanh cuộn */
  padding-bottom: 50px; /* Tránh bị che bởi các phần tử fixed */
}

</style>
