<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header text-center">
            <h4>Đăng nhập</h4>
            <p>Bạn là nhân viên? Hãy đăng nhập ngay nhé!</p>
          </div>
          <div class="card-body">
            <p class="text-danger text-center">{{ messageError }}</p>
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  v-model="payload.Email"
                  id="email"
                  type="email"
                  class="form-control"
                  placeholder="Nhập email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="password">Mật khẩu</label>
                <input
                  v-model="payload.MatKhau"
                  id="password"
                  type="password"
                  class="form-control"
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary btn-block">Đăng nhập</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/auth.service'

export default {
  data() {
    return {
      payload: {
        Email: '',
        MatKhau: '',
        VaiTro: 'nhanvien'
      },
      messageError: ''
    }
  },
  methods: {
    async login() {
  try {
    const response = await AuthService.login(this.payload)
    alert('Đăng nhập thành công')

    const token = response.token
    const payload = JSON.parse(atob(token.split('.')[1]))
    localStorage.setItem('token', token)
    localStorage.setItem('id', payload.id)
    localStorage.setItem('role', payload.role)

    this.$root.emitter.emit('loginStatusChanged')

    // Chuyển hướng về trang chủ sau khi đăng nhập thành công
    const redirect = this.$route.query.redirect || '/'
    this.$router.push(redirect)
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      this.messageError = error.response.data.message
    }
    console.error('Login failed: ', error)
  }
}

  }
}
</script>
