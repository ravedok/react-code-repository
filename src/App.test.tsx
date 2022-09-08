import App, { Title } from './App';
import TestRenderer from 'react-test-renderer';
import { CharacterList } from './CharacterList/CharacterList';

describe("Game of Thrones", () => {  
  it('shoud include app title', async () => {
    const renderer = TestRenderer.create(<App />);
    const instance = renderer.root;        

    expect(await instance.findByType(Title)).not.toBe(null);
  });

  it('shoud include a Character List', async () => {

    const renderer = TestRenderer.create(<App />);
    const instance = renderer.root;        

    expect(await instance.findByType(CharacterList)).not.toBe(null);
  });
});
