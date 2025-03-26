<template>
  <nav class="navbar navbar-expand navbar-light" style="background-color: #108AB1;">

    <a href="/" class="navbar-brand font-weight-bold">
      BookTL
      <img width="40px" src="/image/logo.png" alt="logo" />


    </a>

    <div v-if="isLoggedIn">
      <!-- docgia -->
      <div class="mr-auto navbar-nav" v-if="role == 'docgia'">
        <li class="nav-item ml-2">
          <router-link :to="{ name: 'reader.books' }" class="nav-link">
            Mượn sách
            
          </router-link>
        </li>
        <li class="nav-item ml-3">
          <router-link :to="{ name: 'reader.borrowBooks' }" class="nav-link">
            Lịch sử mượn sách
            
          </router-link>
        </li>
        <li class="nav-item dropdown ml-5">
  <a
    class="nav-link dropdown-toggle"
    href="#"
    id="userDropdown"
    role="button"
    data-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded="false"
  >
    Xin chào, {{ this.user.HoTen }} <i class="fa-solid fa-user"></i>
  </a>
  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
    <router-link :to="{ name: 'user-profile' }" class="dropdown-item">
      Hồ sơ cá nhân <i class="fa-solid fa-user-circle"></i>
    </router-link>
    <a @click="logout" class="dropdown-item">
      Đăng xuất <i class="fa-solid fa-sign-out-alt"></i>
    </a>
  </div>
</li>

      </div>

      <!-- nhanvien -->
      <div class="mr-auto navbar-nav" v-else>
        <li class="nav-item ml-2">
          <router-link :to="{ name: 'books' }" class="nav-link">
            Sách
            
          </router-link>
        </li>

        <li class="nav-item ml-3">
          <router-link :to="{ name: 'publishers' }" class="nav-link">
            Nhà xuất bản
            
          </router-link>
        </li>

        <li class="nav-item ml-3">
          <router-link :to="{ name: 'borrowBooks' }" class="nav-link">
            Theo dõi mượn sách
            
          </router-link>
        </li>

        <li class="nav-item ml-3">
          <router-link :to="{ name: 'readers' }" class="nav-link">
            Độc giả
            
          </router-link>
        </li>

        <li class="nav-item ml-3" v-if="role == 'admin'">
          <router-link :to="{ name: 'employees' }" class="nav-link">
            Nhân viên
            <i class="fa-solid fa-users-gear"></i>
          </router-link>
        </li>
        <li class="nav-item dropdown ml-5">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Xin chào, {{ this.user.HoTen }} <i class="fa-solid fa-user"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
            <a @click="logout" class="dropdown-item">
              Đăng xuất
              <i class="fa-solid fa-sign-out-alt"></i>
            </a>
          </div>
        </li>
      </div>
    </div>

    <!-- Chưa đăng nhập -->
    <div class="mr-auto navbar-nav" v-else>
      <li class="nav-item mr-5">
        <router-link :to="{ name: 'reader.register' }" class="nav-link">
          Đăng ký
          
        </router-link>
      </li>
      <li class="nav-item mr-5">
        <router-link :to="{ name: 'reader.login' }" class="nav-link">
          Đăng nhập
  
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'login' }" class="nav-link">
          Quản trị
          
        </router-link>
      </li>
    </div>
  </nav>
</template>

<script>
import ReaderService from '@/services/reader.service'
import EmployeeService from '@/services/employee.service'
export default {
  data() {
    return {
      isLoggedIn: false, // Trạng thái đăng nhập
      role: '',
      user: {}
    }
  },
  mounted() {
    // Kiểm tra token khi component được mount
    this.checkLoginStatus()
    this.checkRole()
    this.getUser()
    this.$root.emitter.on('loginStatusChanged', this.handleLoginChange)
  },
  beforeUnmount() {
    this.$root.emitter.on('loginStatusChanged', this.checkLoginStatus)
  },
  methods: {
    checkLoginStatus() {
      // Kiểm tra token trong localStorage
      const token = localStorage.getItem('token')
      // console.log(token)
      this.isLoggedIn = !!token // Nếu có token thì isLoggedIn = true
      if (token) {
        this.checkRole()
        this.getUser()
      }
    },

    handleLoginChange() {
    this.checkLoginStatus()
    this.getUser()
  },
    checkRole() {
      // Kiểm tra token trong localStorage
      const role = localStorage.getItem('role')
      this.role = role // Nếu có token thì isLoggedIn = true
    },
    async getUser() {
  if (this.isLoggedIn) {
    const id = localStorage.getItem('id')
    console.log("ID mới:", id) // Kiểm tra ID mới có đúng không
    try {
      this.user = this.role == 'docgia'
        ? await ReaderService.getReaderById(id)
        : await EmployeeService.getEmployeeById(id)

      console.log("User mới:", this.user) // Kiểm tra dữ liệu user
    } catch (error) {
      console.log(error)
      this.$router.push({ name: 'notfound' })
    }
  }
},

    logout() {
      // Xóa token và chuyển hướng về trang đăng nhập
      const role = localStorage.getItem('role')
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('id')
      this.isLoggedIn = false
      if (role == 'docgia') {
        this.$router.push({ name: 'reader.login' })
      } else {
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>
