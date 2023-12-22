<template>
  <div class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <div class="footer-logo">
          <img src="https://i.imgs.ovh/2023/11/24/Mofgs.png" />
        </div>
        <div class="webpage-filing">
          <a href="https://beian.mps.gov.cn/#/query/webSearch?code=32041102001053\">
            <img class="webpage-img" src="https://i.imgs.ovh/2023/12/10/fU5kJ.png" /><span class="p-style"
              >苏公网安备32041102001053号</span
            >
          </a>
          <a href="https://beian.miit.gov.cn">
            <span class="p-style">苏ICP备2023046751号</span>
          </a>
        </div>
      </div>
      <div class="footer-section">
        <div class="footer-links">
          <a href="#"><span class="p-style">隐私政策</span></a>
          <a href="#"><span class="p-style">使用条款和法律声明</span></a>
        </div>
        <div class="social-icons">
          <a href="#">
            <SvgIcon name="tictok" :style="{ width: '1.5rem', height: '1.5rem' }" />
          </a>
          <el-popover placement="top" width="10rem" height="10rem" trigger="click">
            <template #reference>
              <button>
                <SvgIcon name="wechat" :style="{ width: '1.5rem', height: '1.5rem' }" />
              </button>
            </template>
            <template #default>
              <img
                class="wechat-image"
                style="width: 100%; height: 100%"
                src="https://i.imgs.ovh/2023/12/11/fyNks.png"
                alt="WeChat QR Code"
              />
            </template>
          </el-popover>
          <a href="#">
            <SvgIcon name="blog" :style="{ width: '1.5rem', height: '1.5rem' }" />
          </a>
        </div>
        <div v-if="showWechatModal" class="wechat-modal"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SvgIcon from './SvgIcon.vue'

const showWechatModal = ref(false)
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 11rem;
  background-color: var(--nav-background);
  display: flex;
  justify-content: center;

  &-content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 1.25rem;
    padding: 1.25rem 5.625rem;

    .footer-section {
      display: flex;
      flex-direction: column;
      margin-top: 0.625rem;

      .footer-logo {
        width: 13rem;
        height: 3.4rem;
        margin-bottom: 0.625rem;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .webpage-filing {
        display: flex;
        flex-direction: row;
        margin-top: 0px;
        margin-left: 0.5rem;
        gap: 2.62rem;

        a {
          display: flex;
          align-items: center;
          justify-content: center;
          .webpage-img {
            width: 1rem;
            height: 1rem;
            padding-right: 0.5rem;
            padding-bottom: 0.2rem;
          }

          span {
            width: auto;
            height: 2rem;
            color: var(--photo-background);
          }
        }
      }

      .footer-links,
      .social-icons {
        display: flex;
        justify-content: flex-end;
        flex-direction: row;
        gap: 0.625rem;

        a,
        button {
          text-decoration: none;
          margin-bottom: 1.875rem;

          span {
            width: 4.4375rem;
            height: 1.625rem;
            color: var(--photo-background);
          }

          svg {
            margin-right: 1rem;
            cursor: pointer;
          }
        }
      }

      .footer-links a:nth-of-type(1) {
        margin-right: 1.25rem;
      }

      .wechat-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 10;

        .wechat-image {
          max-width: 90%; /* 调整QR码图片大小 */
          margin-bottom: 20px;
        }

        /* 添加过渡动画 */
        .wechat-modal-enter-active,
        .wechat-modal-leave-active {
          transition: opacity 0.5s;
        }
        .wechat-modal-enter, .wechat-modal-leave-to /* .wechat-modal-leave-active in <2.1.8 */ {
          opacity: 0;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .footer {
    height: auto;

    &-content {
      flex-direction: column;
      padding: 0;
      justify-content: center;
      align-items: center;
      margin-top: 0;

      .footer-logo {
        margin: 0 auto;
        scale: 0.6;
      }

      .webpage-filing {
        margin-left: 0 !important;
        gap: 0 !important;
        justify-content: center;
        flex-direction: column !important;

        a {
          span {
            text-align: center;
            height: auto;
          }
        }
      }

      .footer-links,
      .social-icons {
        justify-content: center !important;
        gap: 0.8rem !important;
        a {
          margin-bottom: 1rem !important;
        }
      }

      .footer-links a:nth-of-type(1) {
        margin-right: 0 !important;
      }
    }
  }
}
</style>
