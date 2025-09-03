import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Image as ImageIcon, MapPin, Clock, Star, X, ChevronLeft, ChevronRight } from "lucide-react";

// Dynamic photo loading - loads all photos from store-photos directory
const getStorePhotos = () => {
  const photos = [];
  
  // All actual photos found in your store-photos directory
  const actualPhotos = [
    '482320734_623933456933728_5314976602260847395_n.jpg',
    '492567686_29483787481234569_93699617339614923_n.jpg',
    '493189668_29508091762137474_5184742622880545037_n.jpg',
    '493895882_29508091745470809_2750995328620585198_n.jpg',
    '493977671_29545483881731595_2564475435520389409_n - Copy.jpg',
    '499791524_122197067024125957_6662334937842330989_n - Copy.jpg',
    '505190066_30134253206187990_5533616515198255995_n - Copy.jpg',
    '505655872_30134253412854636_1331824867434274560_n - Copy.jpg',
    '505706434_30134253436187967_5788998893341319441_n - Copy - Copy.jpg',
    '508177774_122199799136125957_4972943391763930032_n.jpg',
    '513810959_30419123081034333_3709411744911075776_n.jpg',
    '514246590_30435098272770147_4467869530271304800_n.jpg',
    '514246757_30435098199436821_3457764334520364545_n - Copy.jpg',
    '514359401_122201686694125957_8915037419316025908_n.jpg',
    '514669781_30482429328037041_4069846458233427568_n.jpg',
    '515195485_30487248010888506_3390381620412541941_n.jpg',
    '515401646_30481564981456809_858973354586736174_n - Copy.jpg',
    '515415874_30481564891456818_7497465827884150699_n - Copy.jpg',
    '517030866_122202566600125957_4277223535794507180_n.jpg'
  ];
  
  actualPhotos.forEach((filename, index) => {
    photos.push({
      id: index + 1,
      src: `/store-photos/${filename}`,
      title: "",
      description: "",
      category: ""
    });
  });
  
  return photos;
};

const PhotoUpload = () => {
  const [storePhotos] = useState(getStorePhotos());
  const [selectedImage, setSelectedImage] = useState<typeof storePhotos[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  
  const photosPerPage = 6; // 3x2 grid
  const totalPages = Math.ceil(storePhotos.length / photosPerPage);
  const currentPhotos = storePhotos.slice(currentPage * photosPerPage, (currentPage + 1) * photosPerPage);
  
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="gallery" className="py-12 lg:py-20 px-4 lg:px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-display">
            <span className="gradient-text-fighter">FOLLOW OUR</span> JOURNEY
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
            Follow our adventures across the largest gaming conventions in the US - vending, networking, and hunting for the rarest collectibles
          </p>
        </div>

        {/* Photo Gallery Grid */}
        <div className="max-w-6xl mx-auto relative">
          {/* Navigation Arrows */}
          {totalPages > 1 && (
            <>
              <Button
                onClick={prevPage}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 p-0 bg-white/20 hover:bg-white/30 backdrop-blur-xl rounded-full shadow-lg z-10 hidden lg:flex items-center justify-center"
                size="sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              
              <Button
                onClick={nextPage}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 p-0 bg-white/20 hover:bg-white/30 backdrop-blur-xl rounded-full shadow-lg z-10 hidden lg:flex items-center justify-center"
                size="sm"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}
          
          <div className="grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 lg:gap-6">
            {currentPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className="group bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedImage(photo)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={photo.src}
                    alt="Convention photo"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Page Indicator */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === currentPage 
                      ? 'bg-blue-400 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-[90vh] w-full">
              <Button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 w-10 h-10 p-0 bg-white/20 hover:bg-white/30 backdrop-blur-xl rounded-full shadow-lg z-10"
                size="sm"
              >
                <X className="w-5 h-5" />
              </Button>
              
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                <img
                  src={selectedImage.src.replace('w=500&h=400', 'w=800&h=600')}
                  alt={selectedImage.title}
                  className="w-full max-h-[70vh] object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 font-display text-white">
                    Convention Photo
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default PhotoUpload;
