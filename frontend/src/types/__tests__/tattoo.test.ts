import { describe, it, expect } from 'vitest';
import { TagCategory, POPULAR_TAGS } from '../tattoo';

describe('TattooTag Types', () => {
  it('has all expected tag categories', () => {
    const categories = Object.values(TagCategory);

    expect(categories).toContain('style');
    expect(categories).toContain('theme');
    expect(categories).toContain('body_part');
    expect(categories).toContain('color');
    expect(categories).toContain('size');
    expect(categories).toContain('artist');
    expect(categories).toContain('meaning');
  });

  it('POPULAR_TAGS has all categories', () => {
    expect(POPULAR_TAGS).toHaveProperty(TagCategory.Style);
    expect(POPULAR_TAGS).toHaveProperty(TagCategory.Theme);
    expect(POPULAR_TAGS).toHaveProperty(TagCategory.BodyPart);
    expect(POPULAR_TAGS).toHaveProperty(TagCategory.Color);
    expect(POPULAR_TAGS).toHaveProperty(TagCategory.Size);
    expect(POPULAR_TAGS).toHaveProperty(TagCategory.Artist);
    expect(POPULAR_TAGS).toHaveProperty(TagCategory.Meaning);
  });

  it('POPULAR_TAGS style category has expected tags', () => {
    const styleTags = POPULAR_TAGS[TagCategory.Style];

    expect(styleTags).toContain('Traditional');
    expect(styleTags).toContain('Realism');
    expect(styleTags).toContain('Japanese');
    expect(styleTags).toContain('Minimalist');
  });

  it('POPULAR_TAGS theme category has expected tags', () => {
    const themeTags = POPULAR_TAGS[TagCategory.Theme];

    expect(themeTags).toContain('Animal');
    expect(themeTags).toContain('Nature');
    expect(themeTags).toContain('Spiritual');
    expect(themeTags).toContain('Mythology');
  });

  it('POPULAR_TAGS body_part category has expected tags', () => {
    const bodyPartTags = POPULAR_TAGS[TagCategory.BodyPart];

    expect(bodyPartTags).toContain('Arm');
    expect(bodyPartTags).toContain('Back');
    expect(bodyPartTags).toContain('Forearm');
    expect(bodyPartTags).toContain('Chest');
  });

  it('all POPULAR_TAGS arrays contain strings', () => {
    Object.values(POPULAR_TAGS).forEach(tagArray => {
      expect(Array.isArray(tagArray)).toBe(true);
      tagArray.forEach(tag => {
        expect(typeof tag).toBe('string');
      });
    });
  });

  it('POPULAR_TAGS has reasonable number of tags per category', () => {
    Object.entries(POPULAR_TAGS).forEach(([category, tagArray]) => {
      // Artist category is dynamic and may be empty
      if (category === TagCategory.Artist) {
        expect(tagArray.length).toBeGreaterThanOrEqual(0);
      } else {
        expect(tagArray.length).toBeGreaterThan(0);
      }
      expect(tagArray.length).toBeLessThan(50);
    });
  });
});
