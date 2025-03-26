<template>
  <div v-if="publisher" class="page">
    <h4>Hiệu chỉnh Nhà xuất bản</h4>
    <PublisherForm
      :publisher="publisher"
      @submit:publisher="updatePublisher"
      @delete:publisher="deletePublisher"
    />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import PublisherForm from '@/components/PublisherForm.vue'
import PublisherService from '@/services/publisher.service'

export default {
  components: {
    PublisherForm
  },
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      publisher: null,
      message: ''
    }
  },
  methods: {
    async getPublisher(id) {
      try {
        this.publisher = await PublisherService.getPublisherById(id)
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

    async updatePublisher(data) {
      try {
        await PublisherService.updatePublisher(this.publisher._id, data)

        alert('Nhà xuất bản được cập nhật thành công')
        this.$router.push({ name: 'publishers' })
      } catch (error) {
        console.log(error)
      }
    },

    async deletePublisher() {
      if (confirm('Bạn muốn xóa Nhà xuất bản này?')) {
        try {
          await PublisherService.deletePublisher(this.publisher._id)
          this.$router.push({ name: 'publishers' })
        } catch (error) {
          console.log(error)
        }
      }
    }
  },

  created() {
    this.getPublisher(this.id)
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

