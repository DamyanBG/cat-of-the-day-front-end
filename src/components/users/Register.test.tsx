import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';

import Register from './Register';

type Container = HTMLDivElement | null

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

let container: Container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container!);
    container?.remove();
    container = null;
});

it('check text content', () => {
    act(() => {
        render(<Register />, container);
    });
    expect(container?.textContent).toBe(
        'First NameLast NameEmailPasswordRegister as participantSubmit'
    );
});

it(`on change tests`,  () => {
    act( () => {
        render(<Register />, container);
    });
    const firstNameInput: HTMLInputElement = container?.querySelector("[data-testid='first_name']")!;
    console.log(firstNameInput)
    expect(firstNameInput?.value).toBe("");
    fireEvent.change(firstNameInput, { target: { value: 'Good Day' } });
    expect(firstNameInput.value).toBe('Good Day');

    const lastNameInput: HTMLInputElement = container?.querySelector("[data-testid='last_name']")!;
    expect(lastNameInput.value).toBe('');
    fireEvent.change(lastNameInput, { target: { value: 'Good Day' } });
    expect(lastNameInput.value).toBe('Good Day');

    const emailInput: HTMLInputElement = container?.querySelector("[data-testid='email']")!;
    expect(emailInput.value).toBe('');
    fireEvent.change(emailInput, { target: { value: 'Good Day' } });
    expect(emailInput.value).toBe('Good Day');

    const passwordInput: HTMLInputElement = container?.querySelector("[data-testid='password']")!;
    expect(passwordInput.value).toBe('');
    fireEvent.change(passwordInput, { target: { value: 'Good Day' } });
    expect(passwordInput.value).toBe('Good Day');
});

it(`Post request positive test`, async () => {
    await act(async () => {
        render(<Register />, container);
    });
    const fakeUser = {
        first_name: 'Stefan',
        last_name: 'Petrov',
        email: 'stefan_p@abv.bg',
        phone_number: '43545345',
    };
    // jest.spyOn(global, 'fetch').mockImplementation(() =>
    //     Promise.resolve({
    //         json: () => Promise.resolve(fakeUser),
    //     })
    // );
    const firstNameInput: HTMLInputElement = container?.querySelector("[data-testid='first_name']")!;
    fireEvent.change(firstNameInput, { target: { value: 'Stefan' } });

    const lastNameInput: HTMLInputElement = container?.querySelector("[data-testid='last_name']")!;
    fireEvent.change(lastNameInput, { target: { value: 'Petrov' } });

    const emailInput: HTMLInputElement = container?.querySelector("[data-testid='email']")!;
    fireEvent.change(emailInput, { target: { value: 'stefan_p@abv.bg' } });

    const passwordInput: HTMLInputElement = container?.querySelector("[data-testid='password']")!;
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    const submitButton: HTMLButtonElement = container?.querySelector("[data-testid='submit-button']")!;

    await act(async () => {
        fireEvent.click(submitButton);
    });

    // to finish

    // const toastifyMessage = getByText(container, "Successful Sign up!")
    // expect(toastifyMessage).toBeInTheDocument();
});