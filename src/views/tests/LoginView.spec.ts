import { describe,expect,it } from "vitest";
import LoginView from "../LoginView.vue";
import { screen, render } from '@testing-library/vue'
import router from "../../router";

describe('LoginView', () => {
    it('should render', () =>{
        render(LoginView, {global: { plugins: [router]} })
        const component = screen.getByTestId("login")
        expect(component).toBeTruthy()
    })
})