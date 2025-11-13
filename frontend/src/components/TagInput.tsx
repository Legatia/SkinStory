import { useState, KeyboardEvent } from 'react';
import { X, Tag as TagIcon, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { POPULAR_TAGS, TagCategory, type TattooTag } from '@/types/tattoo';

interface TagInputProps {
  tags: TattooTag[];
  onTagsChange: (tags: TattooTag[]) => void;
  maxTags?: number;
  placeholder?: string;
}

export function TagInput({
  tags,
  onTagsChange,
  maxTags = 15,
  placeholder = 'Add tags to help others discover your tattoo...',
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const addTag = (label: string, category: TagCategory = TagCategory.Theme) => {
    if (!label.trim()) return;

    const trimmed = label.trim();

    // Check if tag already exists
    if (tags.some(tag => tag.label.toLowerCase() === trimmed.toLowerCase())) {
      return;
    }

    // Check max tags limit
    if (tags.length >= maxTags) {
      return;
    }

    const newTag: TattooTag = {
      id: `${Date.now()}-${Math.random()}`,
      label: trimmed,
      category,
    };

    onTagsChange([...tags, newTag]);
    setInputValue('');
  };

  const removeTag = (tagId: string) => {
    onTagsChange(tags.filter(tag => tag.id !== tagId));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Remove last tag on backspace if input is empty
      removeTag(tags[tags.length - 1].id);
    }
  };

  const handlePopularTagClick = (label: string, category: TagCategory) => {
    addTag(label, category);
    setIsOpen(false);
  };

  return (
    <div className="space-y-3">
      {/* Tags Display */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Badge
              key={tag.id}
              variant="secondary"
              className="pl-3 pr-1 py-1 gap-1 hover:bg-secondary/80"
            >
              <span className="text-sm">{tag.label}</span>
              <button
                type="button"
                onClick={() => removeTag(tag.id)}
                className="ml-1 rounded-full hover:bg-background/50 p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Input Row */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="pl-9"
            disabled={tags.length >= maxTags}
          />
        </div>

        {/* Popular Tags Popover */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" type="button">
              <Plus className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="end">
            <Tabs defaultValue={TagCategory.Style} className="w-full">
              <TabsList className="w-full grid grid-cols-4 rounded-none border-b">
                <TabsTrigger value={TagCategory.Style} className="text-xs">
                  Style
                </TabsTrigger>
                <TabsTrigger value={TagCategory.Theme} className="text-xs">
                  Theme
                </TabsTrigger>
                <TabsTrigger value={TagCategory.BodyPart} className="text-xs">
                  Body
                </TabsTrigger>
                <TabsTrigger value={TagCategory.Color} className="text-xs">
                  Color
                </TabsTrigger>
              </TabsList>

              {Object.entries(POPULAR_TAGS).map(([category, tagList]) => (
                <TabsContent
                  key={category}
                  value={category}
                  className="p-4 max-h-[300px] overflow-y-auto"
                >
                  <div className="flex flex-wrap gap-2">
                    {tagList.map(label => {
                      const isSelected = tags.some(
                        tag => tag.label.toLowerCase() === label.toLowerCase()
                      );

                      return (
                        <Badge
                          key={label}
                          variant={isSelected ? 'default' : 'outline'}
                          className="cursor-pointer hover:bg-primary/80"
                          onClick={() =>
                            !isSelected && handlePopularTagClick(label, category as TagCategory)
                          }
                        >
                          {label}
                        </Badge>
                      );
                    })}
                  </div>
                </TabsContent>
              ))}

              <TabsContent value={TagCategory.Size} className="p-4">
                <div className="flex flex-wrap gap-2">
                  {POPULAR_TAGS[TagCategory.Size].map(label => {
                    const isSelected = tags.some(
                      tag => tag.label.toLowerCase() === label.toLowerCase()
                    );

                    return (
                      <Badge
                        key={label}
                        variant={isSelected ? 'default' : 'outline'}
                        className="cursor-pointer hover:bg-primary/80"
                        onClick={() =>
                          !isSelected && handlePopularTagClick(label, TagCategory.Size)
                        }
                      >
                        {label}
                      </Badge>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value={TagCategory.Meaning} className="p-4">
                <div className="flex flex-wrap gap-2">
                  {POPULAR_TAGS[TagCategory.Meaning].map(label => {
                    const isSelected = tags.some(
                      tag => tag.label.toLowerCase() === label.toLowerCase()
                    );

                    return (
                      <Badge
                        key={label}
                        variant={isSelected ? 'default' : 'outline'}
                        className="cursor-pointer hover:bg-primary/80"
                        onClick={() =>
                          !isSelected && handlePopularTagClick(label, TagCategory.Meaning)
                        }
                      >
                        {label}
                      </Badge>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </PopoverContent>
        </Popover>
      </div>

      {/* Helper Text */}
      <p className="text-xs text-muted-foreground">
        {tags.length}/{maxTags} tags •{' '}
        {tags.length < maxTags
          ? 'Press Enter or comma to add a tag, or choose from popular tags'
          : 'Maximum tags reached'}
      </p>
    </div>
  );
}
