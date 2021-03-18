import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {useField, useForm} from "vee-validate";
import * as yup from 'yup'

export function useRecordForm() {
    const router = useRouter()
    const store = useStore()

    const { handleSubmit, isSubmitting } = useForm()

    const { value: email, errorMessage: eError, handleBlur: eBlur } = useField('email',
        yup.string().trim().required('Введите емаил').email('Введите корректный емаил')
    )

    const PASSWORD_MIN_LEN = 6
    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField('password',
        yup.string().trim()
            .required('Введите пароль')
            .min(PASSWORD_MIN_LEN,`Пароль должен быть не меньше ${PASSWORD_MIN_LEN}`)
    )

    const { value: fio, errorMessage:fError, handleBlur: fBlur } = useField('fio',
        yup.string().trim().required('Введите имя')
    )

    const { value: phone, errorMessage:phError, handleBlur: phBlur } = useField('phone',
        yup.string().trim()
    )

    const onSubmit = handleSubmit(async values => {
        console.log('FormRegister', values)
        try {
            await store.dispatch('login/register', values)
            router.push('/')
        }
        catch (e) {
        }
    })

    return{
        email, eError, eBlur,
        password, pError, pBlur,
        phone, phError, phBlur,
        fio, fError, fBlur,
        onSubmit, isSubmitting,
    }
}
