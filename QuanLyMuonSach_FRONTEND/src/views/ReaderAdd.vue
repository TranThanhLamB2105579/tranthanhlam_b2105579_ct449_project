<template>
  <div class="page">
    <h4>Thêm Độc giả</h4>
    <ReaderForm :reader="reader" @submit:reader="createReader" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import ReaderForm from '@/components/ReaderForm.vue'
import ReaderService from '@/services/reader.service'

export default {
  components: {
    ReaderForm
  },
  data() {
    return {
      reader: {
        HoTen: ''
      },
      message: ''
    }
  },
  methods: {
    async createReader(data) {
      try {
        // console.log(data)
        await ReaderService.createReader(data)
        alert('Độc giả được thêm mới thành công')
        this.$router.push({ name: 'readers' })
      } catch (error) {
        console.log(error)
      }
    }
  },

  created() {
    this.message = ''
  }
}
</script>

<style>
/* Ảnh nền toàn trang */
body {
  background-image: url('/image/background.jpeg'); /* Đường dẫn ảnh nền */
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  margin: 0;
  padding: 0;
}

/* Overlay giúp làm mờ ảnh nền */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: -1;
}

/* Nội dung hiển thị trên nền */
.page {
  position: relative;
  z-index: 1;
  background-color: #CFE1B9; /* Giúp nội dung rõ ràng hơn */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Tạo hiệu ứng nổi */
  max-width: 800px; /* Giới hạn chiều rộng */
  margin: 50px auto; /* Canh giữa */
}

/* Đảm bảo toàn bộ trang có thể cuộn */
html, body {
  height: 100%;
  overflow: auto;
}

</style>
