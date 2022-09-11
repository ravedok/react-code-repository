import { render, screen } from '@testing-library/react';
import { PostList } from "./PostList";
import postFixtures from "../../fixtures/posts.json";
import userFixtures from "../../fixtures/users.json";

describe("Post List", () => {  
  it('shoud include component text', async () => {

    // global.fetch = jest.fn(() =>
    //   Promise.resolve({
    //     headers: {
    //       get: () => 100
    //     },
    //     json: () => Promise.resolve(postFixtures),
    //   }),
    // ) as jest.Mock;

    const makeFetchResp = (data: unknown) => Promise.resolve({
      headers: {
        get: () => 100,        
      },
      json: () => Promise.resolve(data)
    })

    global.fetch = jest.fn()
      .mockReturnValueOnce(makeFetchResp(postFixtures))
      .mockReturnValueOnce(makeFetchResp(userFixtures[0]))
      .mockReturnValueOnce(makeFetchResp(userFixtures[1]))

    render(<PostList />);

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(await screen.findByText('sunt aut facere repellat provident occaecati excepturi optio reprehenderit')).toBeInTheDocument();    
    expect(screen.getAllByText('Leanne Graham')).toHaveLength(8);    
    expect(screen.getAllByText('Ervin Howell')).toHaveLength(2);    
    
  });  
});

