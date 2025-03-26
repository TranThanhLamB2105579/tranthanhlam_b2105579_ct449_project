<template>
  <div v-if="reader" class="page">
    <h4>Hiệu chỉnh Độc giả</h4>
    <ReaderForm :reader="reader" @submit:reader="updateReader" @delete:reader="deleteReader" />
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
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      reader: null,
      message: ''
    }
  },
  methods: {
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

    async updateReader(data) {
      try {
        console.log('Clicked')
        await ReaderService.updateReader(this.reader._id, data)

        alert('Độc giả được cập nhật thành công')
        this.$router.push({ name: 'readers' })
      } catch (error) {
        console.log(error)
      }
    },

    async deleteReader() {
      if (confirm('Bạn muốn xóa Độc giả này?')) {
        try {
          await ReaderService.deleteReader(this.reader._id)
          this.$router.push({ name: 'readers' })
        } catch (error) {
          console.log(error)
        }
      }
    }
  },

  created() {
    this.getReader(this.id)
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
