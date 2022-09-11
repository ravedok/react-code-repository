import { render, screen } from "@testing-library/react";
import { Paginator } from "./Paginator";


describe("Paginator", () => {
    it('should return corrected pagination', async () => {

        const handlerOnChangePage = () => {};

        render(<Paginator totalPages={5} onChangePage={handlerOnChangePage} />)

        expect(await screen.findByText('1')).toBeInTheDocument();

        expect(screen.getAllByRole('button')).toHaveLength(7);

        const previousButton = await screen.findByText('Previous');

        expect(previousButton).toBeInTheDocument();
        expect(previousButton).toBeDisabled();

        const nextButton = await screen.findByText('Next');

        expect(nextButton).toBeInTheDocument();
        expect(nextButton).toBeEnabled();

    });
});