<template>
  <div class="contact">
    <h1 class="contact-title h1-style">法律咨询</h1>
    <el-form :model="ruleForm" ref="ruleFormRef" label-width="100px" class="contact-form" :show-message="false">
      <InputResult
        label="姓名"
        prop="name"
        placeholder="请输入您的姓名/称谓"
        v-model="ruleForm.name"
        :rules="[
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { pattern: NAME, message: '请输入有效姓名', trigger: 'blur' },
        ]"
      >
      </InputResult>
      <InputResult
        type="tel"
        @input="ruleForm.phone = ruleForm.phone.replace(/\D/g, '')"
        label="电话"
        prop="phone"
        placeholder="请输入您的手机号"
        v-model="ruleForm.phone"
        :rules="[
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: checkCountryCode, trigger: 'blur' },
          { pattern: PHONE, message: '请填入正确的手机号', trigger: 'blur' },
        ]"
      >
        <template #prepend>
          <el-select class="country-code-select" v-model="selectedCountryCode">
            <el-option value="澳洲(+61)">澳洲(+61)</el-option>
            <el-option value="中国大陆(+86)">中国大陆(+86)</el-option>
          </el-select>
        </template>
      </InputResult>
      <InputResult
        label="邮箱"
        prop="email"
        placeholder="请输入您的正确的邮箱地址"
        v-model="ruleForm.email"
        :required="false"
        :rules="[{ pattern: EMAIL, message: '请填入正确的邮箱', trigger: 'blur' }]"
      >
      </InputResult>
      <InputResult
        label="内容"
        type="textarea"
        prop="content"
        placeholder="请输入您想咨询的问题"
        v-model="ruleForm.content"
        :rules="[{ required: true, message: '请输入内容', trigger: 'blur' }]"
      >
      </InputResult>
      <el-form-item class="btn-section">
        <el-button class="reset-btn" @click="resetConfirm">重置</el-button>
        <el-button class="submit-btn" :disabled="!enableSubmit" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
    <div class="contact-attention">
      <svg
        t="1700569470283"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="15518"
      >
        <path
          d="M510.4 89.6C277 89.6 87.8 278.8 87.8 512.2S277 934.8 510.4 934.8 933 745.6 933 512.2 743.8 89.6 510.4 89.6z m-29.5 191.7c0-16.3 13.2-29.6 29.6-29.6 16.3 0 29.6 13.2 29.6 29.6v330.8c0 16.3-13.2 29.6-29.6 29.6-16.3 0-29.6-13.2-29.6-29.6V281.3z m29.5 491.4c-16.3 0-29.6-13.2-29.6-29.6s13.2-29.6 29.6-29.6 29.6 13.2 29.6 29.6-13.2 29.6-29.6 29.6z"
          fill="#000000"
          p-id="15519"
        ></path>
      </svg>
      <h4 class="h4-style contact-attention-message">请认真填写以上信息，我们不会泄漏您的信息。</h4>
    </div>
    <div v-if="showResetConfirmation || showSubmitedConfirmation" class="contact-modal-overlay">
      <div v-if="showResetConfirmation" class="contact-modal">
        <div class="modal-content">
          <h3 class="h3-style">确认重置</h3>
          <h5 class="h5-style">
            您即将重置当前页面的所有内容。此操作将清除您输入的所有信息，并不能撤销。请确认是否继续？
          </h5>
          <div class="modal-actions">
            <button @click="handleCancelReset" class="reset-cancel-btn btn-text-style">取消</button>
            <button @click="handleConfirmReset" class="reset-confirm-btn btn-text-style">确认</button>
          </div>
        </div>
      </div>
      <div v-if="showSubmitedConfirmation" class="contact-modal">
        <div class="modal-content">
          <h3 class="h3-style">&nbsp;&nbsp;&nbsp;&nbsp;提交成功&nbsp;！</h3>
          <h5 class="h5-style">
            感谢您的咨询申请！我们的律师团队已收到您的信息，并将尽快给予回复。请保持通讯畅通，以便我们能够及时与您联系。
          </h5>
          <button @click="handleConfirmSubmit" class="submit-confirm-btn btn-text-style">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, toRefs } from 'vue'
import { ElForm, ElMessage, type FormInstance } from 'element-plus'
import { FormState } from '@/typings'
import InputResult from '@/components/InputResult.vue'
import { PHONE, EMAIL, NAME } from '@/utils/regexps'

// Reactive state for the form data and input statuses
const ruleForm = reactive<FormState>({
  name: '',
  phone: '',
  email: '',
  content: '',
})

const ruleFormRef = ref<FormInstance>()
const selectedCountryCode = ref('')
const checkCountryCode = (_: any, __: string, callback: (error?: Error) => void) => {
  if (!selectedCountryCode.value) {
    callback(new Error('请先选择国家代码'))
  } else {
    callback()
  }
}

const showResetConfirmation = ref(false)
const showSubmitedConfirmation = ref(false)

const resetConfirm = () => {
  showResetConfirmation.value = true
}

const handleConfirmReset = () => {
  resetForm()
  showResetConfirmation.value = false
}

const handleCancelReset = () => {
  showResetConfirmation.value = false
}

const submitForm = async () => {
  try {
    await ruleFormRef.value?.validate()
    // TODO: 提交接口
    showSubmitedConfirmation.value = true
  } catch (err) {
    console.error(err)
    ElMessage.error('请检查输入是否正确。')
  }
}

const handleConfirmSubmit = () => {
  resetForm()
  showSubmitedConfirmation.value = false
}
const resetForm = () => ruleFormRef.value?.resetFields()
const enableSubmit = computed(() => {
  const { name, phone, content } = toRefs(ruleForm)
  return name.value.length > 0 && phone.value.length > 0 && content.value.length > 0
})
</script>

<style lang="scss" scoped>
.contact {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--light-background-color);
  align-items: center;
  margin-bottom: 20rem;

  &-title {
    max-width: 15.75rem;
    height: 3.4375rem;
    padding: 5.5rem 0;
    color: var(--primary-color);
  }

  :deep(.el-form) {
    display: flex;
    flex-direction: column;
    gap: 3.125rem;
    margin-right: 4rem;
  }

  :deep(.el-select) {
    border: none;
    width: 8.75rem;
    box-sizing: border-box;

    .el-input__wrapper {
      padding: 0;
    }

    .el-input__inner {
      width: 6.5625rem;
      height: 4.25rem;
      font-size: 1rem;
      padding: 0;
      padding-left: 0.625rem;
      // text-align: center;
    }
  }

  :deep(.el-input-group__prepend) {
    display: flex;
    align-items: stretch; // 使内部元素填满整个高度

    .el-select {
      flex-grow: 1; // 让select元素填满可用空间
    }
  }
  :deep(.el-form-item__content) {
    display: flex;
    width: 36.25rem;
    align-items: center;
    justify-content: center;
    gap: 6.25rem;

    .submit-btn {
      display: flex;
      width: 11.8125rem;
      height: 4.0625rem;
      padding: 0.625rem 1.25rem;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 2.3125rem;
      border: 2px solid #000;
      background-color: var(--light-background-color);

      span {
        color: var(--text-color);
        text-align: center;
        font-family: Martel;
        font-size: 1.875rem;
        font-style: normal;
        font-weight: 500;
        line-height: 3.125rem; /* 125% */
        letter-spacing: 0.2px;
      }

      &:disabled {
        background-color: var(--muted-color);
        border: 2px solid var(--muted-color);
        span {
          color: var(--light-text-color);
        }

        &:hover {
          background-color: var(--muted-color);
          border: 2px solid var(--muted-color);
          span {
            color: var(--light-text-color);
          }
        }
      }

      &:not(:disabled) {
        background-color: var(--primary-color);
        border: 2px solid var(--primary-color);
        span {
          color: var(--light-text-color);
        }

        &:hover {
          background-color: var(--light-background-color);
          border: 2px solid var(--primary-color);
          span {
            color: var(--primary-color);
          }
        }
      }
    }

    .reset-btn {
      display: flex;
      width: 11.8125rem;
      height: 4.0625rem;
      padding: 0.625rem 1.25rem;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 2.3125rem;
      background-color: var(--light-background-color);
      border: 2px solid var(--primary-color);

      span {
        color: var(--primary-color);
        text-align: center;
        font-family: Martel;
        font-size: 1.875rem;
        font-style: normal;
        font-weight: 500;
        line-height: 3.125rem; /* 125% */
        letter-spacing: 0.2px;
      }

      &:hover {
        background-color: var(--primary-color);
        border: 2px solid var(--primary-color);
        span {
          color: var(--light-text-color);
        }
      }
    }
  }

  &-attention {
    display: flex;
    flex-direction: row;
    width: 31.25rem;
    gap: 1.2rem;
    align-items: center;
    justify-content: center;
    margin-top: 3.125rem;
    margin-left: 7.8125rem;

    svg {
      width: 2rem;
    }

    &-message {
      color: #000;
      width: 26.875rem;
    }
  }

  &-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 透明黑色背景 */
    display: flex;
    align-items: center;
    justify-content: center;

    .contact-modal {
      transform: translate(-50%, -50%);
      position: absolute;
      top: 50%;
      left: 50%;
      width: 28rem;
      height: 18rem;
      border-radius: 0.75rem;
      border: 2px solid var(--secondary-color);
      background-color: var(--photo-background);
      display: flex;
      align-items: center;
      flex-direction: column;

      .modal-content {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-top: 2.2rem;

        h3 {
          max-width: 10rem;
          color: var(--secondary-color);
          text-align: center;
          margin-bottom: 2rem;
        }

        h5 {
          width: 20rem;
          color: var(--text-color);
          margin-bottom: 2rem;
        }
      }

      .modal-actions {
        display: flex;
        flex-direction: row;
        gap: 6rem;

        button {
          display: flex;
          padding: 0.65rem 2.5rem;
          align-items: center;
          border-radius: 2.3rem;
          border: 1px solid var(--secondary-color);
          text-align: center;
        }

        .reset-confirm-btn {
          color: var(--photo-background);
          background-color: var(--secondary-color);
        }
        .reset-cancel-btn {
          color: var(--secondary-color);
          background-color: var(--photo-background);
        }
      }

      .submit-confirm-btn {
        display: flex;
        padding: 0.65rem 2.5rem;
        align-items: center;
        border-radius: 2.3rem;
        border: 1px solid var(--secondary-color);
        text-align: center;
        color: var(--photo-background);
        background-color: var(--secondary-color);
      }
    }
  }
}
</style>
