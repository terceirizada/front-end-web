import { describe,expect,it } from "vitest";
import NotFoundView from "../NotFoundView.vue";
import { screen, render } from '@testing-library/vue'
import router from "../../router";

describe('NotFoundView', () => {
    it('should render', () =>{
        render(NotFoundView, {global: { plugins: [router]} })
        const component = screen.getByTestId("notfound")
        expect(component).toBeTruthy()
    })
})