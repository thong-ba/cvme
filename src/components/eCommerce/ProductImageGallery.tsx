import { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selected, setSelected] = useState(0);
  const list = images.length ? images : [''];
  const mainImage = list[selected] || list[0];

  return (
    <div className="space-y-3">
      <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
        {mainImage ? (
          <img
            src={mainImage}
            alt={productName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-slate-400">
            Chưa có ảnh
          </div>
        )}
      </div>
      {list.length > 1 && list[0] && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {list.map((src, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelected(index)}
              className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                selected === index ? 'border-violet-500' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
