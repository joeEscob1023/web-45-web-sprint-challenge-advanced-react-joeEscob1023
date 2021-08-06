import React from "react";
import { render, screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  render(<CheckoutForm />);

  const header = screen.queryByText("Checkout Form");

  expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", () => {
  render(<CheckoutForm />);

  const firstName = screen.getByLabelText(/first name/i);
  const lastName = screen.getByLabelText(/last name/i);
  const address = screen.getByLabelText(/address/i);
  const city = screen.getByLabelText(/city/i);
  const state = screen.getByLabelText(/state/i);
  const zip = screen.getByLabelText(/zip/i);

  const button = screen.getByRole("button", { value: /Checkout/i });

  userEvent.type(firstName, "Joe");
  userEvent.type(lastName, "Escobedo");
  userEvent.type(address, "123 Sun St");
  userEvent.type(city, "Las Vegas");
  userEvent.type(state, "NV");
  userEvent.type(zip, "89149");
  userEvent.click(button);

  const newCustomer = screen.findByText(/Joe/i);
  expect(firstName).toHaveValue("Joe");
  expect(lastName).toHaveValue("Escobedo");
  expect(address).toHaveValue("123 Sun St");
  expect(city).toHaveValue("Las Vegas");
  expect(state).toHaveValue("NV");
  expect(zip).toHaveValue("89149");
  expect(newCustomer).toBeTruthy();
});
