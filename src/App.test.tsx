import App, { Title } from "./App";
import TestRenderer from "react-test-renderer";
import { PostList } from "./components/PostList/PostList";

describe("Fake Blog", () => {
  it("shoud include app title", async () => {
    const renderer = TestRenderer.create(<App />);
    const instance = renderer.root;

    expect(await instance.findByType(Title)).not.toBe(null);
  });

  it("shoud include a post List", async () => {
    const renderer = TestRenderer.create(<App />);
    const instance = renderer.root;

    expect(await instance.findByType(PostList)).not.toBe(null);
  });
});
