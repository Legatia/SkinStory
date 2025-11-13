import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import type { TattooTag } from "@/types/tattoo";

interface TattooCardProps {
  id: string;
  imageUrl: string;
  title: string;
  owner: string;
  isSoulBound?: boolean;
  tags?: TattooTag[];
  showTags?: boolean;
}

const TattooCard = ({
  id,
  imageUrl,
  title,
  owner,
  isSoulBound = true,
  tags,
  showTags = true
}: TattooCardProps) => {
  return (
    <Link to={`/tattoo/${id}`}>
      <Card className="group overflow-hidden border-border bg-card hover:shadow-glow transition-all duration-300 cursor-pointer">
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden relative">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {isSoulBound && (
              <Badge className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm">
                Soul Bound
              </Badge>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-foreground mb-1 truncate">{title}</h3>
            <p className="text-sm text-muted-foreground truncate">by {owner}</p>

            {/* Tags Preview */}
            {showTags && tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.slice(0, 3).map(tag => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="text-xs px-2 py-0"
                  >
                    {tag.label}
                  </Badge>
                ))}
                {tags.length > 3 && (
                  <Badge variant="outline" className="text-xs px-2 py-0">
                    +{tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TattooCard;
