import {describe, expect, it} from 'vitest'
import { render, screen } from '@testing-library/vue'
import SignUpView from '../SignUpView.vue'
import router from '../../router'


describe('SignUpView', () => {
    it('should render', () => {
        render(SignUpView, {global: { plugins: [router]} })
        const component = screen.getByTestId("signup")
        expect(component).toBeTruthy()
    })
})