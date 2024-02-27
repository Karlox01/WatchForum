import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostCreateForm from "../PostCreateForm";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({ goBack: jest.fn() }),
}));

describe("PostCreateForm Tests", () => {
    it("Submitting Form with Valid Data", async () => {
        render(
                <MemoryRouter>
                    <PostCreateForm />
                </MemoryRouter>
                );

        // Simulate entering valid data into the form
        const titleInput = screen.getByTestId("post-title-input");
        const contentEditor = screen.getByTestId("content-editor");

        userEvent.type(titleInput, "Test Title");
        userEvent.type(contentEditor, "Test Content");

        // Simulate form submission
        userEvent.click(screen.getByLabelText(/create/i));

    });
});
