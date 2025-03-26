<template>
  <div class="dashboard">

    
    <!-- Slider ảnh -->
    <div class="slider">
      <div class="slides" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <img v-for="(slide, index) in slides" :key="index" :src="slide" alt="Slide ảnh" />
      </div>
    </div>

    <!-- Danh sách sách -->
    <div class="mt-3 book-container">
      <h4>Danh sách Sách</h4>

      <div v-if="books.length > 0" class="book-grid">
        <div v-for="book in books" :key="book.id" class="book-card">
          <img :src="book.HinhAnh" alt="Bìa sách" class="book-image" />
          <h5 class="book-title">{{ book.TenSach }}</h5>
          <p class="book-author">Tác giả: {{ book.TacGia }}</p>
          <p class="book-price">{{ book.DonGia }} đ</p>
          
        </div>
      </div>

      <p v-else>Không có Sách nào.</p>
    </div>
  </div>
</template>


<script>

import BookService from '@/services/book.service'

export default {
  components: {
  },
  data() {
    return {
      slides: [
        "/image/slide1.png",
        "/image/slide2.png"
      ],
      currentIndex: 0,
      books: [] // Thêm danh sách sách
    };
  },
  mounted() {
    this.startSlideShow();
    this.retrieveBooks(); // Gọi hàm lấy danh sách sách khi trang tải lên
  },
  methods: {
    startSlideShow() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      }, 3000); // Trượt ảnh sau mỗi 3 giây
    },
    async retrieveBooks() {
      try {
        this.books = await BookService.getAllBooks();
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
      }
    }
  }
};
</script>


<style scoped>
.dashboard {
  text-align: center;
  margin-top: 20px;
}

.welcome-text {
  font-size: 24px;
  font-weight: bold;
}

.slider {
  margin-top: 20px;
  width: 80%;
  max-width: 1200px;
  height: 500px;
  overflow: hidden;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px;
}

.slides {
  display: flex;
  transition: transform 1s ease-in-out; /* Hiệu ứng trượt mượt mà */
}

.slides img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  flex-shrink: 0;
}

.book-container {
  margin-top: 20px;
  padding: 20px;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Hiển thị 3-4 sách trên một dòng */
  gap: 20px;
  justify-content: center;
}

.book-card {
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease-in-out;
}

.book-card:hover {
  transform: translateY(-5px);
}

.book-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.book-title {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}

.book-author {
  font-size: 14px;
  color: #555;
}

.book-price {
  font-size: 16px;
  font-weight: bold;
  color: #d9534f;
  margin: 10px 0;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  padding: 8px 12px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}

</style>
