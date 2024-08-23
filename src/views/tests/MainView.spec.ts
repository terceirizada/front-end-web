import { describe,expect,it } from "vitest";
import MainView from "../MainView.vue";
import { screen, render } from '@testing-library/vue'
import router from "../../router";

describe('MainView', () => {
    it('should render', () =>{
        render(MainView, {global: { plugins: [router]} })
        const component = screen.getByTestId("mainview-view")
        expect(component).toBeTruthy()
    })
})