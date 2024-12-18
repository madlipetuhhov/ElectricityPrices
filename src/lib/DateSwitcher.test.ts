import {describe, expect, it} from "vitest"
import {fireEvent, render} from "@testing-library/svelte"
import DateSwitcher from "./DateSwitcher.svelte"

describe('DateSwitcher', () => {
    const testDate = '2024-11-08'

    it('should display the correct default date', () => {
        const {container} = render(DateSwitcher, {props: {date: testDate}})
        expect(container.querySelector('input')!.value).toBe(testDate)
    })

    it('should update date when clicking "Previous" button', async () => {
        const {container} = render(DateSwitcher, {props: {date: testDate}})
        const prevButton = container.querySelector('.btn-prev')!

        await fireEvent.click(prevButton)

        const expectedOneClick = '2024-11-07'
        expect(container.querySelector('input')!.value).toBe(expectedOneClick)

        await fireEvent.click(prevButton)

        const expectedAnotherClick = '2024-11-06'
        expect(container.querySelector('input')!.value).toBe(expectedAnotherClick)
    })

    it('should update date when clicking "Next" button', async () => {
        const {container} = render(DateSwitcher, {props: {date: testDate}})
        const nextButton = container.querySelector('.btn-next')!

        await fireEvent.click(nextButton)

        const expectedOneClick = '2024-11-09'
        expect(container.querySelector('input')!.value).toBe(expectedOneClick)
    })
    // todo: all tests
    it('should disable "Next" button before 13:00', () => {

    })

    it('should enable "Next" button after 13:00', () => {

    })

    it('should disable "Next" button after it has been clicked once', async () => {

    })

    it('should apply "disabled" class when "Next" button is disabled', () => {

    })

})
