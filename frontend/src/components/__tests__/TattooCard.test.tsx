import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TattooCard from '../TattooCard';
import type { TattooTag } from '@/types/tattoo';

const mockTags: TattooTag[] = [
  { id: '1', label: 'Realism', category: 'style' as const },
  { id: '2', label: 'Animal', category: 'theme' as const },
  { id: '3', label: 'Back', category: 'body_part' as const },
  { id: '4', label: 'Colorful', category: 'color' as const },
];

describe('TattooCard', () => {
  it('renders tattoo title and owner', () => {
    render(
      <BrowserRouter>
        <TattooCard
          id="1"
          imageUrl="/test-image.jpg"
          title="Phoenix Rising"
          owner="Alex Chen"
          isSoulBound={true}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Phoenix Rising')).toBeInTheDocument();
    expect(screen.getByText(/by Alex Chen/)).toBeInTheDocument();
  });

  it('displays Soul Bound badge when isSoulBound is true', () => {
    render(
      <BrowserRouter>
        <TattooCard
          id="1"
          imageUrl="/test-image.jpg"
          title="Phoenix Rising"
          owner="Alex Chen"
          isSoulBound={true}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Soul Bound')).toBeInTheDocument();
  });

  it('does not display Soul Bound badge when isSoulBound is false', () => {
    render(
      <BrowserRouter>
        <TattooCard
          id="1"
          imageUrl="/test-image.jpg"
          title="Phoenix Rising"
          owner="Alex Chen"
          isSoulBound={false}
        />
      </BrowserRouter>
    );

    expect(screen.queryByText('Soul Bound')).not.toBeInTheDocument();
  });

  it('displays up to 3 tags when tags are provided', () => {
    render(
      <BrowserRouter>
        <TattooCard
          id="1"
          imageUrl="/test-image.jpg"
          title="Phoenix Rising"
          owner="Alex Chen"
          isSoulBound={true}
          tags={mockTags}
          showTags={true}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Realism')).toBeInTheDocument();
    expect(screen.getByText('Animal')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('displays +X indicator when more than 3 tags exist', () => {
    render(
      <BrowserRouter>
        <TattooCard
          id="1"
          imageUrl="/test-image.jpg"
          title="Phoenix Rising"
          owner="Alex Chen"
          isSoulBound={true}
          tags={mockTags}
          showTags={true}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('does not display tags when showTags is false', () => {
    render(
      <BrowserRouter>
        <TattooCard
          id="1"
          imageUrl="/test-image.jpg"
          title="Phoenix Rising"
          owner="Alex Chen"
          isSoulBound={true}
          tags={mockTags}
          showTags={false}
        />
      </BrowserRouter>
    );

    expect(screen.queryByText('Realism')).not.toBeInTheDocument();
  });

  it('does not display tags when tags array is empty', () => {
    render(
      <BrowserRouter>
        <TattooCard
          id="1"
          imageUrl="/test-image.jpg"
          title="Phoenix Rising"
          owner="Alex Chen"
          isSoulBound={true}
          tags={[]}
          showTags={true}
        />
      </BrowserRouter>
    );

    expect(screen.queryByText('Realism')).not.toBeInTheDocument();
  });
});
