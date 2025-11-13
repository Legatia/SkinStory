import { useState } from 'react';
import { Search, X, TrendingUp, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTrendingTags } from '@/hooks/use-blockscout';
import type { TattooTag, TagCategory } from '@/types/tattoo';

interface TagSearchProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagSearch({
  selectedTags,
  onTagsChange,
  placeholder = 'Search by tags... (e.g., Traditional, Nature, Arm)',
}: TagSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: trendingTags, isLoading } = useTrendingTags(15);

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      onTagsChange([...selectedTags, tag]);
    }
    setSearchQuery('');
  };

  const removeTag = (tag: string) => {
    onTagsChange(selectedTags.filter(t => t !== tag));
  };

  const clearAll = () => {
    onTagsChange([]);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      addTag(searchQuery.trim());
    }
  };

  // Filter trending tags based on search query
  const filteredTrendingTags = trendingTags?.filter(tag =>
    tag.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder={placeholder}
          className="pl-9 pr-10"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Filters:</span>
          {selectedTags.map(tag => (
            <Badge
              key={tag}
              variant="default"
              className="pl-3 pr-1 py-1 gap-1"
            >
              <span>{tag}</span>
              <button
                onClick={() => removeTag(tag)}
                className="ml-1 rounded-full hover:bg-primary-foreground/20 p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="h-7 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Trending Tags */}
      {!searchQuery && trendingTags && trendingTags.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Trending Tags</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map(tag => {
              const isSelected = selectedTags.includes(tag.label);
              return (
                <Badge
                  key={tag.id}
                  variant={isSelected ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-primary/80 transition-colors"
                  onClick={() => isSelected ? removeTag(tag.label) : addTag(tag.label)}
                >
                  {tag.label}
                  {tag.count && <span className="ml-1 opacity-70">({tag.count})</span>}
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchQuery && filteredTrendingTags && filteredTrendingTags.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-3">Suggested Tags</h3>
          <div className="flex flex-wrap gap-2">
            {filteredTrendingTags.map(tag => {
              const isSelected = selectedTags.includes(tag.label);
              return (
                <Badge
                  key={tag.id}
                  variant={isSelected ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-primary/80"
                  onClick={() => isSelected ? removeTag(tag.label) : addTag(tag.label)}
                >
                  {tag.label}
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      {/* No results */}
      {searchQuery && (!filteredTrendingTags || filteredTrendingTags.length === 0) && (
        <div className="text-center py-8 text-sm text-muted-foreground">
          <p>No matching tags found.</p>
          <p className="mt-2">
            Press Enter to create a custom tag: <Badge variant="outline">{searchQuery}</Badge>
          </p>
        </div>
      )}
    </div>
  );
}
