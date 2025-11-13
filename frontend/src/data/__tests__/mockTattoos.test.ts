import { describe, it, expect } from 'vitest';
import { mockTattoos } from '../mockTattoos';

describe('mockTattoos', () => {
  it('has at least one tattoo', () => {
    expect(mockTattoos.length).toBeGreaterThan(0);
  });

  it('all tattoos have required properties', () => {
    mockTattoos.forEach(tattoo => {
      expect(tattoo).toHaveProperty('id');
      expect(tattoo).toHaveProperty('title');
      expect(tattoo).toHaveProperty('owner');
      expect(tattoo).toHaveProperty('imageUrl');
      expect(tattoo).toHaveProperty('story');
      expect(tattoo).toHaveProperty('isSoulBound');
      expect(tattoo).toHaveProperty('mintedDate');
      expect(tattoo).toHaveProperty('tags');
    });
  });

  it('all tattoos have non-empty titles', () => {
    mockTattoos.forEach(tattoo => {
      expect(tattoo.title).toBeTruthy();
      expect(tattoo.title.length).toBeGreaterThan(0);
    });
  });

  it('all tattoos have non-empty stories', () => {
    mockTattoos.forEach(tattoo => {
      expect(tattoo.story).toBeTruthy();
      expect(tattoo.story.length).toBeGreaterThan(0);
    });
  });

  it('all tattoos have valid image URLs', () => {
    mockTattoos.forEach(tattoo => {
      expect(tattoo.imageUrl).toBeTruthy();
      expect(tattoo.imageUrl).toMatch(/\.(jpg|jpeg|png|gif|webp)$/i);
    });
  });

  it('all tattoos have tags array', () => {
    mockTattoos.forEach(tattoo => {
      expect(Array.isArray(tattoo.tags)).toBe(true);
    });
  });

  it('all tattoos have at least one tag', () => {
    mockTattoos.forEach(tattoo => {
      expect(tattoo.tags.length).toBeGreaterThan(0);
    });
  });

  it('all tags have required properties', () => {
    mockTattoos.forEach(tattoo => {
      tattoo.tags.forEach(tag => {
        expect(tag).toHaveProperty('id');
        expect(tag).toHaveProperty('label');
        expect(tag).toHaveProperty('category');
        expect(tag.id).toBeTruthy();
        expect(tag.label).toBeTruthy();
        expect(tag.category).toBeTruthy();
      });
    });
  });

  it('tag categories are valid', () => {
    const validCategories = ['style', 'theme', 'body_part', 'color', 'size', 'artist', 'meaning'];

    mockTattoos.forEach(tattoo => {
      tattoo.tags.forEach(tag => {
        expect(validCategories).toContain(tag.category);
      });
    });
  });

  it('all tattoos have unique IDs', () => {
    const ids = mockTattoos.map(t => t.id);
    const uniqueIds = new Set(ids);

    expect(uniqueIds.size).toBe(ids.length);
  });

  it('all tattoos have valid minted dates', () => {
    mockTattoos.forEach(tattoo => {
      const date = new Date(tattoo.mintedDate);
      expect(date.toString()).not.toBe('Invalid Date');
    });
  });

  it('tattoo 1 (Phoenix Rising) has expected properties', () => {
    const phoenix = mockTattoos.find(t => t.title === 'Phoenix Rising');

    expect(phoenix).toBeDefined();
    expect(phoenix?.owner).toBe('Alex Chen');
    expect(phoenix?.isSoulBound).toBe(true);
    expect(phoenix?.tags.length).toBeGreaterThan(0);
  });
});
