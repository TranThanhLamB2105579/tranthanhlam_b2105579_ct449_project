<template>
  <div class="container mt-4">
    <h2 style="color: #0056b3;">Hồ sơ cá nhân</h2>
    <div class="card p-3">
      <div class="card p-3" style="background-color: #CFE1B9; border-radius: 10px;">

      <p><strong>Họ tên:</strong> {{ user.HoTen }}</p>
      <p><strong>Email:</strong> {{ user.Email }}</p>
      <p><strong>Số Điện Thoại:</strong> {{ user.DienThoai }}</p>
      <p><strong>Địa chỉ:</strong> {{ user.DiaChi }}</p>
      <p><strong>Vai trò:</strong> {{ role == 'docgia' ? 'Độc giả' : 'Nhân viên' }}</p>
    </div>
  </div>
  </div>
</template>

<script>
import ReaderService from '@/services/reader.service'
import EmployeeService from '@/services/employee.service'

export default {
  data() {
    return {
      user: {},
      role: '' // Thêm role vào data để cập nhật chính xác
    }
  },
  mounted() {
    this.loadUser()
  },
  methods: {
    loadUser() {
      const id = localStorage.getItem('id')
      this.role = localStorage.getItem('role') // Cập nhật role từ localStorage

      console.log('ID:', id) // Kiểm tra ID
      console.log('Vai trò:', this.role) // Kiểm tra vai trò từ localStorage

      if (!id || !this.role) return // Kiểm tra nếu thiếu thông tin

      if (this.role === 'docgia') {
        ReaderService.getReaderById(id).then(response => {
          this.user = response
        })
      } else {
        EmployeeService.getEmployeeById(id).then(response => {
          this.user = response
        })
      }
    }
  }
}
</script>


