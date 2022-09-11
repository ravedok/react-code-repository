import { render, screen } from '@testing-library/react';
import { PostList } from "./PostList";
import postFixtures from "../../fixtures/posts.json";

describe("Post List", () => {  

  beforeEach(() => {
});

  it('shoud include component text', async () => {

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(postFixtures),
      }),
    ) as jest.Mock;

    render(<PostList />);

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(await screen.findByText('sunt aut facere repellat provident occaecati excepturi optio reprehenderit')).toBeInTheDocument();    
  });  
});

