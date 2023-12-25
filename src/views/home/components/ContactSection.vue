<template>
  <div class="contact">
    <div class="contact-container">
      <h2 class="contact-title h2-style">联系我们</h2>
      <Carousel
        :transition="500"
        :itemsToShow="isMobile ? 1 : 3"
        :wrapAround="true"
        :autoplay="3000"
        :paginationEnabled="false"
        :navigationEnabled="false"
        :mouseDrag="true"
        :touchDrag="true"
        class="rotating-chart"
        @update:modelValue="handleSlideChange"
      >
        <Slide v-for="(item, index) in contactDetail" :key="item.id">
          <div class="slide-content" :class="{ 'active-slide': index === centerIndex, 'svg-slide': item.id === 2 }">
            <img v-if="item.wechatImg" :src="item.wechatImg" class="slide-wechat" />
            <SvgIcon
              v-if="item.svgName"
              :name="item.svgName"
              :color="index === centerIndex ? '#fff' : '#6c3636'"
              class="slide-icon"
            />
            <p class="slide-name h5-style">{{ item.contentFirst }}</p>
            <p v-if="item.contentSecond" class="slide-name h5-style">{{ item.contentSecond }}</p>
          </div>
        </Slide>
      </Carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { ref, reactive, computed } from 'vue'
import useMedia from 'vue-hooks-plus/es/useMedia'
import SvgIcon from '@/components/SvgIcon.vue'

const isMobile = useMedia(['(max-width: 768px)'], [true], false)

const contactModules = reactive([
  {
    id: 1,
    wechatImg: 'https://i.imgs.ovh/2023/12/25/khoqp.jpeg',
    contentFirst: '法律顾问',
  },
  {
    id: 2,
    contentFirst: '经营地址：新北区云河路新桥商务大楼4楼东',
    contentSecond: '注册地址：天宁区尚东花园',
    svgName: 'location',
  },
  {
    id: 3,
    wechatImg: 'https://i.imgs.ovh/2023/12/25/khbRR.jpeg',
    contentFirst: '杨律师',
  },
])

const currentIndex = ref(-1)
const handleSlideChange = (event: any) => {
  currentIndex.value = event - 1
}
const centerIndex = computed(() => {
  return (currentIndex.value + 1) % contactModules.length
})

// watchEffect(() => {
//   contactModules.forEach((module, index) => {
//     const color = index === centerIndex.value ? '#FFFEF8' : '#A52A2A'
//     module.svgMarkup = generateSvgMarkup(module.svgMarkup, color)
//   })
// })

const contactDetail = computed(() => {
  return contactModules.map((module) => module)
})
</script>

<style lang="scss" scoped>
.contact {
  display: flex;
  width: auto;
  height: 31.25rem;
  padding: 2.8125rem 12.1875rem 0.625rem 12.1875rem;
  justify-content: center;
  align-items: center;
  background-color: var(--background-color);

  &-container {
    display: flex;
    width: 65.625rem;
    padding: 2.5rem 0;
    flex-direction: column;
    align-items: center;
    gap: 4.5625rem;

    .contact-title {
      color: var(--secondary-color);
      margin-top: -5.3125rem;
    }

    .rotating-chart {
      display: flex;
      width: 100%;
      height: 18.4375rem;
      justify-content: center;
      align-items: center;
      .slide-content {
        display: flex;
        width: 26rem !important;
        padding-top: 2rem;
        padding-bottom: 1rem;
        flex-direction: column;
        align-items: center;
        background: var(--photo-background);
        gap: 0.9375rem;

        .slide-wechat {
          width: 16rem;
          height: 16rem;
        }
        .slide-icon {
          width: 4.5rem;
          height: 4.5rem;
          margin-bottom: 2rem;

          svg {
            width: 100%;
            height: 100%;
          }
        }

        .slide-name {
          color: var(--text-color);
          text-align: center;
        }
      }

      .active-slide {
        display: flex;
        width: 22.5rem;
        // padding: 1rem;
        flex-direction: column;
        align-items: center;
        background: var(--secondary-color);

        .slide-icon {
          transform: scale(1.1);
          padding-top: 0.3125rem;
        }

        .slide-name {
          color: var(--background-color);
          padding-top: 0.3125rem;
        }
      }

      .svg-slide {
        padding: 5rem 0;
      }
    }
  }
}
@media (max-width: 768px) {
  .contact {
    height: auto;
    padding: 0;

    &-container {
      width: 18rem;
      gap: 0.5rem;

      .contact-title {
        margin-top: 0;
        font-family: Martel;
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 700;
        line-height: 2rem; /* 133.333% */
        letter-spacing: 0.00625rem;
      }

      .rotating-chart {
        height: auto;
        padding: 1rem 0 !important;

        .slide-content {
          width: 20rem !important;
          height: auto;
          justify-content: space-evenly;

          .slide-icon {
            transform: scale(0.8);
          }
        }

        .active-slide {
          display: flex;

          .slide-icon {
            transform: scale(0.8);
            padding-top: 0rem;
          }

          .slide-name {
            display: flex;
            max-width: 15rem;
            flex-wrap: wrap;
          }
        }

        .svg-slide {
          padding: 4.125rem 0;
        }
      }
    }
  }
}
</style>
