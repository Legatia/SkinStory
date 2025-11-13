import { useState } from "react";
import Navbar from "@/components/Navbar";
import TattooCard from "@/components/TattooCard";
import { TagSearch } from "@/components/TagSearch";
import { mockTattoos } from "@/data/mockTattoos";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Grid, LayoutList, TrendingUp, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Discover = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter tattoos by selected tags
  // Note: This uses mock data for now. Will use Blockscout API when contracts are deployed
  const filteredTattoos = mockTattoos.filter(tattoo => {
    if (selectedTags.length === 0) return true;

    // Match selected tags with tattoo tags
    return selectedTags.some(selectedTag =>
      tattoo.tags.some(tattooTag =>
        tattooTag.label.toLowerCase() === selectedTag.toLowerCase()
      )
    );
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Discover <span className="text-primary">Tattoos</span>
          </h1>
          <p className="text-muted-foreground mb-6">
            Explore soul-bound tattoo NFTs and the stories behind them
          </p>

          {/* Tag-based Search */}
          <div className="mb-6">
            <TagSearch
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
            />
          </div>

          {/* Filter and Sort Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Tabs value={sortBy} onValueChange={(v) => setSortBy(v as 'recent' | 'popular' | 'trending')} className="w-auto">
              <TabsList>
                <TabsTrigger value="recent" className="gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="hidden sm:inline">Recent</span>
                </TabsTrigger>
                <TabsTrigger value="popular" className="gap-2">
                  <Heart className="h-4 w-4" />
                  <span className="hidden sm:inline">Popular</span>
                </TabsTrigger>
                <TabsTrigger value="trending" className="gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Trending</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredTattoos.length} {filteredTattoos.length === 1 ? 'tattoo' : 'tattoos'} found
            {selectedTags.length > 0 && (
              <span> matching your filters</span>
            )}
          </p>
        </div>

        {/* Tattoo Grid */}
        {filteredTattoos.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "flex flex-col gap-4"
          }>
            {filteredTattoos.map((tattoo) => (
              <TattooCard
                key={tattoo.id}
                id={tattoo.id}
                imageUrl={tattoo.imageUrl}
                title={tattoo.title}
                owner={tattoo.owner}
                isSoulBound={tattoo.isSoulBound}
                tags={tattoo.tags}
                showTags={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">
              No tattoos found matching your search
            </p>
            <Button
              variant="outline"
              onClick={() => setSelectedTags([])}
            >
              Clear filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Discover;
