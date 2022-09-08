import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe("Game of Thrones", () => {

  it('shoud include app title', async () => {
    render(<App />);
    expect(await screen.findByText('Game of Thrones')).toBeInTheDocument();
  });
});
