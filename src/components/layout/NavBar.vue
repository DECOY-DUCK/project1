<template>
  <nav id="navbar" :class="{ open: isMenuOpen }">
    <div class="navbar-container">
      <div class="logo" @click="closeMenu">
        <router-link :to="{ name: 'Home' }" exact class="link">
          HappyHouse
        </router-link>
      </div>

      <div class="menu-container">
        <ul class="items">
          <li class="item" @click="initLocation">
            <router-link
              :to="{ name: 'HouseDeal' }"
              class="link"
              active-class="active"
            >
              아파트 실거래가
            </router-link>
          </li>
          <li class="item" @click="closeMenu">
            <router-link
              :to="{ name: 'Notice' }"
              class="link"
              active-class="active"
            >
              공지사항
            </router-link>
          </li>
        </ul>

        <div class="divider"></div>

        <!-- 비로그인 유저  -->
        <ul class="items" v-if="!loginUser">
          <li class="item" @click="closeMenu">
            <router-link
              :to="{ name: 'LogIn' }"
              class="link"
              active-class="active"
            >
              Login
            </router-link>
          </li>
          <li class="item" id="signup-button" @click="closeMenu">
            <router-link
              :to="{ name: 'SignUp' }"
              class="link"
              active-class="active"
            >
              Sign up
            </router-link>
          </li>
        </ul>
        <!-- 로그인 유저  -->
        <ul class="items" v-else>
          <li class="item" @click="closeMenu">
            <router-link
              :to="{ name: 'Check' }"
              class="link"
              active-class="active"
            >
              My page
            </router-link>
          </li>
          <li class="item">
            <button
              id="logout"
              type="button"
              active-class="active"
              @click="logoutHandler"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      <!-- Toggle button -->
      <button class="toggle-button" @click="toggleMenu">
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import store from "@/store/index";

const accountsStore = "accountsStore";
const houseDealStore = "houseDealStore";

export default {
  name: "NavBar",
  data() {
    return {
      loginUser: false,
      isMenuOpen: false,
    };
  },
  created() {
    this.loginUser = this.isLogin;
    this.clearLocation();
  },
  watch: {
    isLogin() {
      this.loginUser = this.isLogin;
    },
  },
  computed: {
    ...mapState(accountsStore, ["isLogin"]),
    ...mapState(houseDealStore, ["sidoName"]),
  },
  methods: {
    ...mapMutations(accountsStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    ...mapActions(houseDealStore, ["clearLocation"]),
    logoutHandler() {
      // 로그아웃 처리
      this.SET_IS_LOGIN(false);
      this.SET_USER_INFO(null);
      this.loginUser = this.isLogin;

      sessionStorage.removeItem("access-token");
      this.closeMenu();

      if (this.$route.path != "/") {
        this.$router.push({ name: "Home" });
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    changeLoginUser() {
      let userinfo = store.getters["accountsStore/checkUserInfo"];
      if (userinfo == null) {
        this.loginUser = false;
      } else {
        this.loginUser = true;
      }
    },
    initLocation() {
      this.clearLocation();
    },
  },
  // created() {
  //   this.changeLoginUser();
  // },
};
</script>

<style scoped>
#navbar {
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  padding: var(--size-large);
  background-color: var(--color-white);
  z-index: 99;
  transition: all var(--animation-duration) ease-in;
}

.navbar-container {
  max-width: var(--display-maxWidth);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  font-size: var(--font-regular);
  font-weight: var(--weight-semi-bold);
  color: var(--color-black);
}

.divider {
  margin: 0 var(--size-large);
  content: "";
  width: 1px;
  height: var(--font-regular);
  background-color: var(--color-grey);
}

.menu-container {
  align-items: center;
}

.menu-container,
.items {
  display: flex;
  justify-content: space-between;
}

.item {
  padding: var(--size-small) var(--size-regular);
}

#signup-button {
  margin-left: var(--size-regular);
  background-color: var(--color-green);
  border-radius: var(--size-micro);
}

#signup-button .link {
  color: var(--color-white);
}

#signup-button:hover {
  background-color: var(--color-dark-green);
}

.toggle-button {
  position: absolute;
  right: var(--size-large);
  top: var(--size-large);
  padding: 0;
  display: none;
}

.toggle-button i {
  font-size: var(--font-regular);
  color: var(--color-black);
}

.active {
  color: var(--color-black);
  font-weight: var(--weight-semi-bold);
}

#logout {
  padding: 0;
  margin: 0;
}

#logout:hover {
  color: var(--color-black);
  font-weight: var(--weight-semi-bold);
  cursor: pointer;
}

/* Media Query for below w640 */
@media screen and (max-width: 640px) {
  .toggle-button,
  .toggle-button i {
    display: block;
    cursor: pointer;
  }

  #navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  #navbar.open {
    background-color: var(--color-light-white);
  }

  #navbar.open .menu-container {
    display: block;
  }

  .menu-container {
    width: 100%;
    margin-top: var(--size-large);
    flex-direction: column;
    text-align: center;
    display: none;
  }

  .divider {
    display: none;
  }

  .items {
    flex-direction: column;
  }

  .item {
    padding: var(--size-medium);
    border-bottom: 1px solid var(--color-light-grey);
    border-radius: var(--size-micro);
  }

  .item:hover {
    background-color: var(--color-light-grey);
    cursor: pointer;
  }

  .item:hover a {
    color: var(--color-grey);
  }

  #signup-button {
    margin: 0;
    margin-top: var(--size-small);
  }
}
</style>
