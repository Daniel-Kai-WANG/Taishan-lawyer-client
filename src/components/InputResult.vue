<template>
  <div class="input-result">
    <el-form-item ref="formItemRef" :label="label" :prop="prop" :rules="rules" :required="required" class="input-item">
      <el-input :placeholder="placeholder" v-model="innerValue" :type="type" autosize clearable class="input-content">
        <template v-if="slots.prepend" #prepend>
          <slot name="prepend"></slot>
        </template>
        <template v-if="isSuccess" #suffix>
          <ValidIcon visible class="success-icon" />
        </template>
      </el-input>
    </el-form-item>
    <div v-if="hasError" class="h5-style error-section">
      <InvalidIcon visible />
      <span class="error-message">
        {{ errorMessage }}
      </span>
    </div>
    <div v-if="type === 'textarea'" class="icon-wrapper">
      <ValidIcon v-if="isSuccess" visible class="textarea-success-icon" />
      <div class="clear-icon-wrapper" @click="clearValue">
        <svg
          t="1700634681546"
          class="clear-icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="16516"
          width="16"
          height="16"
        >
          <path
            d="M511.706311 64.021106C264.433578 64.021106 63.981197 264.47451 63.981197 511.745197s200.451358 447.724091 447.724091 447.724091c247.270686 0 447.724091-200.453405 447.724091-447.724091S758.976998 64.021106 511.706311 64.021106zM752.447281 693.122127c16.396435 16.382109 16.396435 42.971697 0 59.353806-8.197706 8.197706-18.937305 12.297071-29.676903 12.297071s-21.479197-4.099365-29.676903-12.297071L511.711428 571.093886 330.328357 752.476957c-8.197706 8.197706-18.937305 12.297071-29.676903 12.297071-10.739599 0-21.479197-4.099365-29.676903-12.297071-16.396435-16.382109-16.396435-42.971697 0-59.353806L452.356598 511.74008 270.974551 330.358033c-16.396435-16.382109-16.396435-42.971697 0-59.353806 16.396435-16.396435 42.958394-16.396435 59.353806 0L511.711428 452.386274l181.382047-181.382047c16.396435-16.396435 42.957371-16.396435 59.353806 0 16.396435 16.382109 16.396435 42.971697 0 59.353806L571.065234 511.74008 752.447281 693.122127z"
            fill="#bdbdbd"
            p-id="16517"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormItemInstance, FormItemRule } from 'element-plus'
import { computed, ref, useSlots, watch } from 'vue'
import ValidIcon from './icons/ValidIcon.vue'
import InvalidIcon from './icons/InvalidIcon.vue'
import { EMAIL } from '@/utils/regexps'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    rules?: FormItemRule | FormItemRule[]
    placeholder?: string
    label?: string
    prop?: string
    type?: string
    required?: boolean
  }>(),
  {
    placeholder: '请输入',
    type: 'text',
    required: true,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', val?: string | null | number): void
}>()

watch(
  () => props.modelValue,
  (newValue) => {
    showClearIcon.value = !!newValue
  },
)

const clearValue = () => {
  emit('update:modelValue', '')
}
const slots = useSlots()
const formItemRef = ref<FormItemInstance>()
const showClearIcon = ref(false)
const hasError = computed(() => formItemRef.value?.validateState === 'error')
const errorMessage = computed(() => formItemRef.value?.validateMessage)
const isSuccess = computed(() => {
  if (props.prop === 'email') {
    return EMAIL.test(props.modelValue ?? '') && formItemRef.value?.validateState === 'success'
  }
  return formItemRef.value?.validateState === 'success'
})
const innerValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>

<style lang="scss" scoped>
.input-result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  :deep(.el-form-item) {
    margin-bottom: 2px;
    .el-form-item__label {
      width: auto;
      color: var(--text-color);
      font-family: Montserrat;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 30px; /* 150% */
      letter-spacing: 0.2px;
      padding-right: 30px;
      padding-top: 20px;
    }
  }

  :deep(.el-input__inner),
  :deep(.el-textarea__inner) {
    &::placeholder {
      color: var(--muted-color);
      font-family: Martel;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 150% */
      letter-spacing: 0.1px;
    }
  }

  :deep(.el-input).input-content {
    height: 70px;
  }

  .input-content {
    width: 40.625rem;
    // height: 70px;
    border-radius: 0.5rem;
    border: 1px solid var(--muted-color);

    :deep(.el-input__inner) {
      width: 100%;
      height: 100%;
      padding: 10px 20px;
      font-family: Martel;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 150% */
      letter-spacing: 0.1px;
    }

    .success-icon {
      width: 25px;
      height: 25px;
      color: #5bc1af;
      z-index: 100;
    }
  }

  :deep(.el-textarea) {
    border: none;

    .el-textarea__inner {
      width: 100%;
      padding: 22px 30px;
      border: 1px solid var(--muted-color);
      font-family: Martel;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 150% */
      letter-spacing: 0.1px;
    }
  }

  .error-section {
    width: 40.625rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: rgba(255, 0, 0, 0.81);
    margin-right: -165px;
    line-height: normal;
    gap: 5px;

    svg {
      width: 25px !important;
      height: 25px !important;
    }
  }

  .icon-wrapper {
    display: flex;
    flex-direction: row;
    position: absolute;
    justify-content: flex-end;
    width: 3.125rem;
    top: 23px;
    left: 38.8125rem;
    gap: 0.5rem;

    .clear-icon-wrapper {
      display: flex;
      align-items: center;

      .clear-icon {
        cursor: pointer;
      }
    }
  }
}
</style>
