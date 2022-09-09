import { render, screen } from '@testing-library/react';
import { CharacterList } from "./CharacterList";
import characterFixtures from "../../fixtures/characters.json";

describe("Character List", () => {  

  beforeEach(() => {
});

  it('shoud include component text', async () => {

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(characterFixtures),
      }),
    ) as jest.Mock;

    render(<CharacterList />);

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(await screen.findByText('The Daughter of the Dusk')).toBeInTheDocument();    
  });  
});

