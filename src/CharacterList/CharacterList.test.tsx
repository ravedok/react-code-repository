import { render, screen } from '@testing-library/react';
import { CharacterList } from "./CharacterList";

describe("Character List", () => {  
  it('shoud include component text', async () => {
    render(<CharacterList />);

    expect(await screen.findByText('Character List')).toBeInTheDocument();
  });  
});
